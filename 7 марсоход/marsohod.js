var marsohod = require ('@amperka/robot-2wd').connect();

var receiver = require ('@amperka/ir-receiver').connect(P3);

receiver.on('receive', function(code){
 
  if(code===receiver.keys.TOP){
     marsohod.go({l:1, r:1});
  }

  if(code===receiver.keys.POWER){
     marsohod.stop(); 
  }  
});


