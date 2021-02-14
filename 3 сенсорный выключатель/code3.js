var led = require('@amperka/led').connect(P3);

var button = require('@amperka/digital-line-sensor').connect(P4);


function myToggle(){
   led.toggle();
}


button.on('white', myToggle );