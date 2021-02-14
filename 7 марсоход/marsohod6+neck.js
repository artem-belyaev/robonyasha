//скорость робота
var  speed = 0.5;

// шаг изменения скорости
var  SPEED_STEP = 0.25;

// скорость поворачиваемого колеса
var turnSpeed =  speed - SPEED_STEP;

var neck = require ('@amperka/servo').connect(P8);
var angle = 90;
var step = 5;

var marsohod = require('@amperka/robot-2wd').connect();

var receiver = require('@amperka/ir-receiver').connect(P3);

var led = require('@amperka/led').connect(P2);

var lastDriveCode;

// движение
function drive(code){
  //движение вперед
  if(code===receiver.keys.TOP){
     marsohod.go({l: speed, r: speed});
     led.turnOn();
  }

  //движение назад
  if(code===receiver.keys.BOTTOM){
     marsohod.go({l:-speed, r:-speed});
     led.turnOff();
  }

  //движение влево
  if(code===receiver.keys.LEFT){
     marsohod.go({l:0, r: speed});
    led.blink(0.3, 0.3);
  }

  //движение вправо
  if(code===receiver.keys.RIGHT){
     marsohod.go({l: speed, r:0});
    led.blink(0.3, 0.3);
  }

   //движение   влево-вперед
  if(code===receiver.keys.TOP_LEFT 
    ){
     marsohod.go({l:turnSpeed, r: speed});
    led.blink(0.3, 0.3);
  }

  //движение вправо-вперед
  if(code===receiver.keys.TOP_RIGHT){
     marsohod.go({l: speed, r:turnSpeed});
    led.blink(0.3, 0.3);
  }

  //движение влево-назад
  if(code===receiver.keys.BOTTOM_LEFT){
     marsohod.go({l:-turnSpeed, r:-speed});
    led.blink(0.3, 0.3);
  }

  //движение вправо-назад
  if(code===receiver.keys.BOTTOM_RIGHT){
     marsohod.go({l:-speed, r:-turnSpeed});
    led.blink(0.3, 0.3);
  }
  
  lastDriveCode = code;
}

//  выключение
function  powerOff(){
  marsohod.stop(); 
  led.turnOff();
}

// регулировка скорости
function  speedSettings(code){
   // скорость +
  if(code === receiver.keys.PLUS)
  {
    if (speed >= 1){
      speed = 1;
      turnSpeed = speed - SPEED_STEP;
    } else {
      speed = speed + SPEED_STEP;    
      turnSpeed = speed - SPEED_STEP;    
    };
  }

  // скорость -
  if(code === receiver.keys.MINUS)
  {
    if (speed <= 0){
      speed = 0;
      turnSpeed = 0;
    } else {
      speed = speed - SPEED_STEP;
      turnSpeed = speed - SPEED_STEP;    
    }
  }
  
   // вызовем drive с последним кодом
   drive(lastDriveCode);
}

// поворото шеи
function  neckSettings(code){
   //to right
  if(code === receiver.keys.GREEN)
  {
    if (angle < 150){
      angle = angle + step;
    };
  }

  // to left -
  if(code === receiver.keys.RED)
  {
    if (angle > 30){
      angle = angle - step;
    };
  }
  
   neck.write(angle);
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
  
  // регулировка скорости
  if (code === receiver.keys.MINUS ||
     code === receiver.keys.PLUS){
     speedSettings(code);
  }
  
  // движение шеей
  if (code === receiver.keys.RED ||
     code === receiver.keys.GREEN){
     neckSettings(code);
  }
  
  //остановка
  if(code===receiver.keys.POWER){
     powerOff();
  } 
}

receiver.on('receive', codeExec);


