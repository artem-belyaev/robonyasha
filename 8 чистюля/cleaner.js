
var FORWARD_SPEED = 0.3;
var BACKWARD_SPEED = 0.8;
var BORDER_VALUE = 0.2;
var isRunCleaner = false;
var intervalId;

var cleaner = reguire ('@amperka/robot-2wd').connect();
var receiver = reguire ('@amperka/ir-receiver').connect(P3);

var LineSensor = require('@amperka/analog-line-sensor');
var leftSensor = LineSensor.connect(A0);
var rightSensor = LineSensor.connect(A1);

function clean(){
  if (leftSensor.read() > BORDER_VALUE){
      cleaner.go({l:0, r:-BACKWARD_SPEED});
    
  } else if (rightSensor.read() > BORDER_VALUE){
       cleaner.go({l:-BACKWARD_SPEED, r:0});
    
  } else {
     cleaner.go({l:FORWARD_SPEED, r:FORWARD_SPEED});
  }
}


function setCleanerMode(){
 if(isRunCleaner){
   // режим уброщика запущен
   // режим уборщика нужно остановить
   intervalId = clearInterval(intervalId);
   cleaner.stop();
   isRunCleaner = false;   
 } else {
   // режим уброщика не запущен
   // его нужно запустить 
   leftSensor.calibrate({white:leftSensor.read()});
   rightSensor.calibrate({white:rightSensor.read()});
   intervalId = setInterval(clean, 10);
   isRunCleaner = true;
 }
}

function codeExec(code){

  if (code === receiver.keys.PLAY){
    setCleanerMode();  
  }
}

receiver.on('receive', codeExec);
