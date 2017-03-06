const DEFAULT_GAMESPEED = 3;
const DEFAULT_BLOCKSIZE = 15;
const DEFAULT_BORDER_WIDTH = 2;
const DEFAULT_LOOPING = true;
const DEFAULT_GRID = false;
const DEFAULT_THEME = 'rainbow';

class Setting {
   constructor(height, width) {
      this.height = height;
      this.width = width;
   }

   static distance(a, b) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;

      return Math.sqrt(dx*dx + dy*dy);
   }
}
var setting = new Setting(1, 2);

function Settings() {
   this.gameSpeed = DEFAULT_GAMESPEED;
   this.blockSize = DEFAULT_BLOCKSIZE;
   this.borderWidth = DEFAULT_BORDER_WIDTH;
   this.loopEnabled = DEFAULT_LOOPING;
   this.gridEnabled = DEFAULT_GRID;
   this.themeName = DEFAULT_THEME;
   this.colors = rainbow();

   this.getSettings = function() {
      return [
         {
            param: 's',
            name: 'Game Speed',
            value: this.gameSpeed,
            set: function(value) {
               settings.gameSpeed = enforceInt(value, DEFAULT_GAMESPEED);
            }
         }, {
            param: 'bs',
            name: 'Block Size',
            value: this.blockSize,
            set: function(value) {
               settings.blockSize = enforceInt(value, DEFAULT_BLOCKSIZE);
            }
         }, {
            param: 'bw',
            name: 'Border Width',
            value: this.borderWidth,
            set: function(value) {
               settings.borderWidth = enforceInt(value, DEFAULT_BORDER_WIDTH);
            }
         }, {
            param: 'l',
            name: 'Looping',
            value: this.loopEnabled,
            set: function(value) {
               settings.loopEnabled = defaultTruthy(value, DEFAULT_LOOPING);
            }
         }, {
            param: 'g',
            name: 'Grid',
            value: this.gridEnabled,
            set: function(value) {
               settings.gridEnabled = defaultTruthy(value, DEFAULT_GRID);
            }
         }, {
            param: 't',
            name: 'Theme',
            value: this.themeName,
            set: function(value) {
               settings.setTheme(value);
            }
         }
      ];
   }

   this.parseParams = function() {
      var settings = this.getSettings;

      // Set values from URI parameters.
      location.search.substr(1).split("&").forEach(function(param) {
         var pair = param.split("=");
         if (pair.length !== 2) {
            return;
         }

         for (var i = 0; i < settings.length; i++) {
            if (settings[i].param === pair[0]) {
               settings[i].set(decodeURIComponent(pair[1]));
            }
         }
      }.bind(this));

      this.updateParams();
   }

   this.updateParams = function() {
      var URI = 'index.html?';
      this.getSettings().forEach(function(setting) {
         URI += setting.param + '=' + cleanTruthy(setting.value);
      });

      history.replaceState({}, "URI Update", URI);
   }

   //todo: ifIsValidTheme(theme) theme();
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
