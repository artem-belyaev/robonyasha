var SPEED = 0.3;

var detective = require('@amperka/robot-2wd');

var LineSensor = require('@amperka/analog-line-sensor');

var leftSensor = LineSensor.connect(A0);
var rightSensor = LineSensor.connect(A1);


var lineFollwer = require('@amperka/pid').create({
  target:0, 
  kp:6,
  ki:0.1,
  outputMin: -SPEED,
  outputMax: SPEED,  
}) ;


lineFollwer.run(function (){
var right = rightSensor.read();
var left = leftSensor.read();
var error = left - right;

  var output = lineFollwer.update(error);
  
  detective.go({
    l: SPEED + output,
    r: SPEED - output   
  });
  
  
}, 0.02);



