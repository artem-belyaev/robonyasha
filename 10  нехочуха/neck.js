var neck = require ('@amperka/servo').connect(P8);
var angle = 90;
var step = 5;

setInterval(function(){

  if(angle <= 30 || angle >=150){
    step = -step;
  }
  

  angle = angle + step;
  
  neck.write(angle);
}, 100);