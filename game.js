function Game() {
   this.state = 'P';
   this.paused = false;
   this.canvas = null;
   this.currentFrame = 0;

   this.cols = 1;
   this.rows = 1;

   this.init = function() {
      edibles.init();//move this
      this.resize();

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

   this.togglePause = function() {
      this.paused = !this.paused;
   }

   this.drawMenu = function() {

      textAlign(CENTER);

      textSize(32);
      var position = this.canvas.height / 5;
      text("Block Size", 0, position, this.canvas.width, 50);

      fill(255, 0, 100);
      rect((this.canvas.width / 2) - (settings.blockSize / 2), 200, settings.blockSize, settings.blockSize);

      text("Speed", 0, 300, this.canvas.width, 50);

      text(this.speed, 0, 350, this.canvas.width, 50);
   }
}
