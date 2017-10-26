class Game {
   constructor() {
      this.state = 'Settings';
      this.canvas = null;
      this.currentFrame = 0;
      this.settingIndex = 0;

      this.cols = 1;
      this.rows = 1;
   }

   init() {
      this.resize();
      frameRate(60);

      window.addEventListener('resize', function () {
         this.resize();
      }.bind(this));

      this.initMenu();
   }

   scale(value) {
      settings.blockSize += value;
      this.resize();
   }

   resize() {
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

   clear() {
      snake.kill();
      snake.x = 0;
      snake.y = 0;
      snake.currentDirection = RIGHT_ARROW;
      edibles.reset();
   }

   initMenu() {
      this.clear();
   }

   activate() {
      this.state = 'Active';
   }

   isPaused() {
      return this.state === 'Paused';
   }

   togglePause() {
      this.state = this.isPaused() ? 'Active' : 'Paused';
   }

   drawPaused() {
      textAlign(CENTER);

      textSize(25);
      fill(255, 0, 100);
      text("(Paused)", 0, this.canvas.height / 2, this.canvas.width, 50);
   }

   drawMenu() {
      textAlign(CENTER);

      text("Shortcuts:", 0, this.canvas.height - 50, this.canvas.width, 50);
      textSize(25);
      fill(255, 0, 100);
      text("(Press Space to Start)", 0, this.canvas.height - 50, this.canvas.width, 50);
   }
}
