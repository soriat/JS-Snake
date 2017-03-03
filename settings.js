var blockSize = 25;
var gameSpeed = 15;
var loopEnabled = false;
var colors = [];

function parseParams() {
   // Set values from URI parameters.
   location.search.substr(1).split("&").forEach(function(param) {
      var pair = param.split("=");
      if (pair.length !== 2) {
         return;
      }

      var value = decodeURIComponent(pair[1]);
      switch(pair[0]) {
      case 'loop':
         loopEnabled = isTruthy(value);
         return;
      case 'bs':
         blockSize = enforceInt(value, 25);
         return;
      case 's':
         gameSpeed = enforceInt(value, 15);
         return;
      }

      //updateGetParams();
   });

   colors = pastel();
}
