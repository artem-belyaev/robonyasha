var SPEED = 0.6;

var marsohod = require('@amperka/robot-2wd').connect();

var receiver = require('@amperka/ir-receiver').connect(P3);

receiver.on('receive', function(code){
 
  if(code===receiver.keys.TOP){
     marsohod.go({l:SPEED, r:SPEED});
  }
  
  if(code===receiver.keys.BOTTOM){
     marsohod.go({l:-SPEED, r:-SPEED});
  }
  
  if(code===receiver.keys.LEFT){
     marsohod.go({l:0, r:SPEED});
  }
    if(code===receiver.keys.RIGHT){
     marsohod.go({l:SPEED, r:0});
  }
  if(code===receiver.keys.POWER){
     marsohod.stop(); 
  } 
  
});


