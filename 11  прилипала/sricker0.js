var speed  = 0.5;
var  distanceMin = 10;
var distanceMaxx = 14;
var sticker = require ('@amperka/robot-2wd').connect();

var ultrasonic = require('@amperka/ultrasonic').connect(
  {
  trigPin: P12,
  echoPin: P13,
  }); 

var check = function(distance){

  if (distance > distanceMaxx){
     sticker.go({l:SPEED, r:SPEED});
  } else if(distance < distanceMin){
     sticker.go({l:-SPEED, r:-SPEED});
  } else {
    sticker.stop(); 
  }
  
};

setInterval(function(){
  ultrasonic.ping(
    function(error, value){
     if (!error){
       check(value);
     }
    }, 
    'cm');

}, 100);