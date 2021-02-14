//скорость робота
var SPEED = 0.5;

//скорость поворачиваемого колеса
var TURN_SPEED = SPEED - 0.2;

var marsohod = require('@amperka/robot-2wd').connect();

var receiver = require('@amperka/ir-receiver').connect(P3);

var led = require('@amperka/led').connect(P2);

//движение
function drive(code){
  //движение вперед
  if(code===receiver.keys.TOP 
    ){
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

   //движение   влево-вперед
  if(code===receiver.keys.TOP_LEFT 
    ){
     marsohod.go({l:TURN_SPEED, r:SPEED});
  }

  //движение вправо-вперед
  if(code===receiver.keys.TOP_RIGHT){
     marsohod.go({l:SPEED, r:TURN_SPEED});
  }

  //движение влево-назад
  if(code===receiver.keys.BOTTOM_LEFT){
     marsohod.go({l:-TURN_SPEED, r:-SPEED});
  }

  //движение вправо-назад
  if(code===receiver.keys.BOTTOM_RIGHT){
     marsohod.go({l:-SPEED, r:-TURN_SPEED});
  }
}

function codeExec(code){
 
  //движение 
  if(code===receiver.keys.TOP ||
     code===receiver.keys.BOTTOM ||
     code===receiver.keys.LEFT ||
     code===receiver.keys.RIGHT ||
     code===receiver.keys.TOP_RIGHT ||
     code===receiver.keys.TOP_LEFT ||
     code===receiver.keys.BOTTOM_RIGHT ||
     code===receiver.keys.BOTTOM_LEFT)
  {
     drive(code);
  }

  //остановка
  if(code===receiver.keys.POWER){
     marsohod.stop(); 
     led.turnOff();
  } 
}

receiver.on('receive', codeExec);


