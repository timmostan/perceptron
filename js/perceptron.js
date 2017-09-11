//perceptron activation function
function sign(n) {
  if (n >= 0) {
    return 1;
  } else {
    return -1;
  }
}
//peceptron class
function perceptron() {
  this.inputNum = 2;
  this.weights = new Array();
  this.learningRate = 0.1;
  //initialize perceptron weights randomly with value between -1 and 1
  for (var i=0; i<this.inputNum; i++) {
    this.weights[i] = Math.random() * 2 - 1;
    //alert(this.weights[i]);
  }
  //method for pereptron to guess the correct classification
  //based on the inputs and current weights values
  this.guess = function(inputs) {
    var sum = 0.0;
    //guessing equation is
    //input1*weight1 + input2*weight2
    for (var i=0; i<this.inputNum; i++) {
      sum+= inputs[i] * this.weights[i];
    }
    //guess output is the sign of the guessing equestion result
    var output = sign(sum);
    return output;
  }
  //train method is checking the guess result for inputs
  //with the correct target output
  this.train = function(inputs, target) {
    var guess = this.guess(inputs);
    //error is target - guess
    //if guess is correct - error will be 0, otherwise error <>0
    var error = target - guess;
    //tweak the weights within error value and learningRate
    //if guess OK - no tweak value 0
    for (var i=0; i<this.inputNum; i++) {
      this.weights[i]= this.weights[i] + error * inputs[i] * this.learningRate;
    }
  }
}
/*
  point class with following fields:
  x - X coordinate
  y - Y coordinate
  classify - proper classification above (1 value ) or below (-1 value) line
              this value is for perceptron training target
*/
function point() {
  this.x = Math.floor(Math.random() * 498);
  this.y = Math.floor(Math.random() * 498);
  if (this.x > this.y) {
    this.classify = 1;
  } else {
    this.classify = -1;
  }
}
//test function - not used in final programm
/*function setupPerceptron() {
  var p = new perceptron();
  var inputs = new Array(-1, 0.5);
  var guess = p.guess(inputs);
  //alert(guess);
}*/
//function to draw line representing function y=x
function drawLine() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.moveTo(0,0);
  ctx.lineTo(500,500);
  ctx.stroke();
}
//function to show single point on Canvas
function showPoint(x,y,color) {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.arc(x,y,2,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
}
//function to clearCanvas before drawing anything
function clearCanvas() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
}
//proper function to create points randomly
//and train the perceptron for classifing them
function trainPereptron(n, train_count) {
  //fill out points array
  var points = new Array();
  for(var i=0; i<n; i++) {
      var pnt = new point();
      points.push(pnt);
  }
  //perceptron training loop
  var per = new perceptron();
  var counter=0;
  (function loop() {
    setTimeout(function () {
      for(var i=0; i<points.length; i++) {
        var inputs = new Array(points[i].x, points[i].y);
        var target = points[i].classify;
        var guess = per.guess(inputs);
        if (guess == target) {
          var color;
          if (guess == -1) {
            color = "#FF0000";
          } else {
            color = "#7FFF00";
          }
          showPoint(points[i].x, points[i].y, color);
        } else {
          showPoint(points[i].x, points[i].y, "#000000");
        }
        per.train(inputs, target);
      }
      counter++;
      if(counter < train_count) {
        loop();
        }
      else {
        alert('Finished with ' + counter + ' trainings! Did I do well?');
      }
    }, 1000);
  }());

}
//main JQuery function
$(function () {
  $('#train').click(function() {
    clearCanvas();
    drawLine();
    var $trainCount = $('#trainCount').val();
    trainPereptron(500,$trainCount);
  });

});
