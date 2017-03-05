const DEFAULT_GAMESPEED = 3;
const DEFAULT_BLOCKSIZE = 15;
const DEFAULT_BORDER_WIDTH = 2;
const DEFAULT_LOOPING = true;
const DEFAULT_GRID = false;
const DEFAULT_THEME = 'rainbow';

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
            type: 'int',
            name: 'Game Speed',
            value: this.gameSpeed,
            default: DEFAULT_GAMESPEED,
         }, {
            param: 'bs',
            type: 'int',
            name: 'Block Size',
            value: this.blockSize,
            default: DEFAULT_BLOCKSIZE,
         }, {
            param: 'bw',
            type: 'int',
            name: 'Border Width',
            value: this.borderWidth,
            default: DEFAULT_BORDER_WIDTH,
         }, {
            param: 'l',
            type: 'bool',
            name: 'Looping',
            value: this.loopEnabled,
            default: DEFAULT_LOOPING,
         }, {
            param: 'g',
            type: 'bool',
            name: 'Grid',
            value: this.gridEnabled,
            default: DEFAULT_GRID,
         }, {
            param: 't',
            type: 'string',
            name: 'Theme',
            value: this.themeName,
            default: DEFAULT_THEME,
         }
      ];
   }

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
            this.gameSpeed = enforceInt(value, DEFAULT_GAMESPEED);
            return;
         case 'bs':
            this.blockSize = enforceInt(value, DEFAULT_BLOCKSIZE);
            return;
         case 'bw':
            this.borderWidth = enforceInt(value, DEFAULT_BORDER_WIDTH);
            return;
         case 'l':
            this.loopEnabled = isTruthy(value);
            return;
         case 'g':
            this.gridEnabled = isTruthy(value);
            return;
         case 't':
            this.setTheme(value);
            return;
         }
      }.bind(this));

      this.updateParams();
      console.log(this.getSettings());
   }

   this.updateParams = function() {
      var params = '?' +
       's=' + this.gameSpeed +
       '&bs=' + this.blockSize +
       '&bw=' + this.borderWidth +
       '&l=' + (this.loopEnabled ? 1 : 0) +
       '&g=' + (this.gridEnabled ? 1 : 0) +
       '&t=' + this.themeName;

      history.replaceState({}, "URI Update", "index.html" + params);
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
