//скорость робота
var  speed = 0.5;

// шаг изменения скорости
var  SPEED_STEP = 0.25;

// скорость поворачиваемого колеса
var turnSpeed =  speed - SPEED_STEP;

var neck = require ('@amperka/servo').connect(P8);

//  максимальный угол поворота шеи
var angle = 90;

// шаг угла поворота шеи
var step = 10;

var robot = require('@amperka/robot-2wd').connect();

var receiver = require('@amperka/ir-receiver').connect(P3);

var led = require('@amperka/led').connect(P2);

var lastDriveCode;
 
//  флаг режима пробуксовки
var isSlip = false;

// движение
function drive(code){
  //движение вперед
  if(code===receiver.keys.TOP){
     robot.go({l: speed, r: speed});
     led.turnOn();
  }

  //движение назад
  if(code===receiver.keys.BOTTOM){
     robot.go({l:-speed, r:-speed});
     led.turnOff();
  }

  //движение влево
  if(code===receiver.keys.LEFT){
     robot.go({l:0, r: speed});
    led.blink(0.3, 0.3);
  }

  //движение вправо
  if(code===receiver.keys.RIGHT){
     robot.go({l: speed, r:0});
    led.blink(0.3, 0.3);
  }

   //движение   влево-вперед
  if(code===receiver.keys.TOP_LEFT 
    ){
     robot.go({l:turnSpeed, r: speed});
    led.blink(0.3, 0.3);
  }

  //движение вправо-вперед
  if(code===receiver.keys.TOP_RIGHT){
     robot.go({l: speed, r:turnSpeed});
    led.blink(0.3, 0.3);
  }

  //движение влево-назад
  if(code===receiver.keys.BOTTOM_LEFT){
     robot.go({l:-turnSpeed, r:-speed});
    led.blink(0.3, 0.3);
  }

  //движение вправо-назад
  if(code===receiver.keys.BOTTOM_RIGHT){
     robot.go({l:-speed, r:-turnSpeed});
    led.blink(0.3, 0.3);
  }
  
  lastDriveCode = code;
}

//  выключение
function  powerOff(){
  robot.stop(); 
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

function stop(){
  print('stop');
  robot.stop();
  isSlip = false;
}

function toForward(){
  print('toForward');
  robot.go({l:1, r:1});
}

function toBack(){
  print('toBack');
  robot.go({l:-1, r:-1});
}

function slip(){
  // если slip запущен, то выходим
  
  if (isSlip) { 
   return null;
  } else {
    isSlip = true;
    toBack();
    setTimeout(toForward, 500);
    setTimeout(stop, 1500);
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
  
  // "пробуксовка"
  if (code === receiver.keys.BLUE){
    slip();  
  }
}

receiver.on('receive', codeExec);

