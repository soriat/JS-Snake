function Settings() {
   this.gameSpeed = 3;
   this.blockSize = 15;
   this.borderWidth = 2;
   this.loopEnabled = true;

   this.themeName = 'rainbow';
   this.colors = rainbow();

   this.parseParams = function() {
      // Set values from URI parameters.
      location.search.substr(1).split("&").forEach(function(param) {
         var pair = param.split("=");
         if (pair.length !== 2) {
            return;
         }

         var value = decodeURIComponent(pair[1]);
         switch(pair[0]) {
         case 's':
            this.gameSpeed = enforceInt(value, 15);
            return;
         case 'bs':
            this.blockSize = enforceInt(value, 25);
            return;
         case 'bw':
            this.borderWidth = enforceInt(value, 2);
            return;
         case 'l':
            this.loopEnabled = isTruthy(value);
            return;
         case 't':
            this.setTheme(value);
            return;
         }
      }.bind(this));

      this.updateParams();
   }

   this.updateParams = function() {
      var params = '?' +
       's=' + this.gameSpeed +
       '&bs=' + this.blockSize +
       '&bw=' + this.borderWidth +
       '&l=' + (this.loopEnabled ? 1 : 0) +
       '&t=' + this.themeName;

       
      history.replaceState({}, "URI Update", "index.html" + params);
   }

   this.setTheme = function(theme) {
      switch(theme) {
         case 'rainbow':    this.colors = rainbow();    break;
         case 'pastel':     this.colors = pastel();     break;
         case 'vipera':     this.colors = vipera();     break;
         case 'sky':        this.colors = sky();        break;
         case 'fire':       this.colors = fire();       break;
         case 'rose':       this.colors = rose();       break;
         case 'ocean':      this.colors = ocean();      break;
         case 'forest':     this.colors = forest();     break;
         case 'autumn':     this.colors = autumn();     break;
         case 'watermelon': this.colors = watermelon(); break;
         case 'princess':   this.colors = princess();   break;
         case 'sunset':     this.colors = sunset();     break;
         case 'test':       this.colors = test();       break;
         default:
            return;
      }
      this.themeName = theme;
   }
}
