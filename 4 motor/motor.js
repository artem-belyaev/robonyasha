
var Motor = require('@amperka/motor');
var leftMotor = Motor.connect(Motor.MotorShield.M1);
var rightMotor = Motor.connect(Motor.MotorShield.M2);
leftMotor.write(0);
rightMotor.write(0);