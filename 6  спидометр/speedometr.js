var Motor = require('@amperka/motor');
var LineSensor = require('@amperka/digital-line-sensor');

var leftMotor = Motor.connect(Motor.MotorShield.M1);
var rightMotor = Motor.connect(Motor.MotorShield.M2);

leftMotor.write(1);
rightMotor.write(1);


var encoder = LineSensor.connect(P10);
var encoder2 = LineSensor.connect(P9);

var radius = 32;
var wheelLength = 2*Math.PI*radius;
var step = 1/12;
var revolutions = 0;
var speed = 0;

var lastTime = getTime();

function myEncoder(sName){
  revolutions = revolutions + step ;
  var distance = revolutions*wheelLength;
 
  var currentTime = getTime();
  
  var deltaTime = currentTime - lastTime;
  
  lastTime = currentTime;
  speed = wheelLength*step/deltaTime/1000;
   
   print('');
   print(sName);
   print('*********************');
   print(Math.round(distance /10), 'sm.');
   print(speed.toFixed(2), 'm/s.');
   print('*********************');

}

function k1Encoder (){
  myEncoder('k1');
}

function k2Encoder (){
  myEncoder('k2');
}

encoder.on('black', k1Encoder );

encoder2.on('black', k2Encoder );
