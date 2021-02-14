//  В случае, когда робот застревает(буксует)
//  попробуем сдать немного назад 
//  и на полном газе проехать препятствие вперед

var robot = require ('@amperka/robot-2wd').connect();
var receiver = require ('@amperka/ir-receiver').connect(P3);

var isSlip = false;

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
  if (code === receiver.keys.BLUE){
    slip();  
  }
}

receiver.on('receive', codeExec);