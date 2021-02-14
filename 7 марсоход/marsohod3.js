//скорость робота
var SPEED = 0.3;

var marsohod = require('@amperka/robot-2wd').connect();

var receiver = require('@amperka/ir-receiver').connect(P3);

var led = require('@amperka/led').connect(P2);

receiver.on('receive', function(code){
 
  //движение вперед
  if(code===receiver.keys.TOP){
     marsohod.go({l:SPEED, r:SPEED});
  }
  
  //движение назад
  if(code===receiver.keys.BOTTOM){
     marsohod.go({l:-SPEED, r:-SPEED});
  }
  
  //движение влево
  if(code===receiver.keys.LEFT){
     marsohod.go({l:0, r:SPEED});
  }
  
  //движение вправо
  if(code===receiver.keys.RIGHT){
     marsohod.go({l:SPEED, r:0});
  }
  
  //  вкл/выкл led
  if(code===receiver.keys.PLAY){
     led.toggle();
  }  
  
  //остановка
  if(code===receiver.keys.POWER){
     marsohod.stop(); 
     led.turnOff();
  } 
  
});


