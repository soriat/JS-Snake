function Settings() {
   this.blockSize = 15;
   this.gameSpeed = 3;
   this.loopEnabled = true;
   this.colors = rainbow();
   this.borderWidth = 2;

   this.parseParams = function() {
      // Set values from URI parameters.
      location.search.substr(1).split("&").forEach(function(param) {
         var pair = param.split("=");
         if (pair.length !== 2) {
            return;
         }

         var value = decodeURIComponent(pair[1]);
         switch(pair[0]) {
         case 'theme':
            this.setTheme(value);
            return;
         case 'loop':
            this.loopEnabled = isTruthy(value);
            return;
         case 'borderWidth':
            this.borderWidth = enforceInt(value, 2);
            return;
         case 'blocksize':
            this.blockSize = enforceInt(value, 25);
            return;
         case 'speed':
            this.gameSpeed = enforceInt(value, 15);
            return;
         }
      }.bind(this));

      this.updateParams();
   }

   this.updateParams = function() {

   }

   this.setTheme = function(theme) {
      switch(theme) {
         case 'rainbow':    this.colors = rainbow();    break;
         case 'pastel':     this.colors = pastel();     break;
         case 'vipera':     this.colors = vipera();     break;
         case 'sky':        this.colors = sky();        break;
         case 'fire':       this.colors = fire();       break;
         case 'ocean':      this.colors = ocean();      break;
         case 'forest':     this.colors = forest();     break;
         case 'watermelon': this.colors = watermelon(); break;
         case 'princess':   this.colors = princess();   break;
         case 'sunset':     this.colors = sunset();     break;
         case 'test':       this.colors = test();       break;
      }
   }
}
