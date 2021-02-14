var projector = require('@amperka/led').connect(P1);

var s = 2;
var mOn =1;
var mOff= 2;


projector.blink(s*mOn,s*mOff);
