function Game() {
   this.state = 'Settings';
   this.canvas = null;
   this.currentFrame = 0;

   this.cols = 1;
   this.rows = 1;

   this.init = function() {
      this.resize();
      edibles.init();//move this

      window.addEventListener('resize', function () {
         this.resize();
      }.bind(this));
   }

   this.scale = function(value) {
      settings.blockSize += value;
      this.resize();
   }

   this.resize = function() {
      var scaledWidth = windowWidth;
      var scaledHeight = windowHeight;
      scaledWidth -= scaledWidth % settings.blockSize;
      scaledHeight -= scaledHeight % settings.blockSize;

      this.canvas = createCanvas(scaledWidth, scaledHeight);

      this.cols = scaledWidth / settings.blockSize;
      this.rows = scaledHeight / settings.blockSize;

      this.canvas.position(
       (windowWidth - scaledWidth) / 2,
       (windowHeight - scaledHeight) / 2);
   }

   this.isPaused = function() {
      return this.state === 'Paused';
   }

   this.togglePause = function() {
      this.state = this.isPaused() ? 'Active' : 'Paused';
   }

   this.drawMenu = function() {
      textAlign(CENTER);

      textSize(25);
      fill(255, 0, 100);
      text("(Press Space to Start)", 0, this.canvas.height - 50, this.canvas.width, 50);
   }
}
