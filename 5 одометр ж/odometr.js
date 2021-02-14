
var Motor = require('@amperka/motor');
var leftMotor = Motor.connect(Motor.MotorShield.M1);
var rightMotor = Motor.connect(Motor.MotorShield.M2);

leftMotor.write(1);
rightMotor.write(1);


var encoder = require('@amperka/digital-line-sensor').connect(P10);

var radius = 32;
var wheelLength = 2*Math.PI*radius;
var step = 1/12;
var revolutions = 0;

function myEncoder(){
  revolutions = revolutions + step ;
  var distance = revolutions*wheelLength;
  print(Math.round(distance /10), 'sm');
}


encoder.on('black', myEncoder );
