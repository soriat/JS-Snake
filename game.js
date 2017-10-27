class Game {
   constructor() {
      this.state = 'Settings';
      this.canvas = null;
      this.currentFrame = 0;
      this.settingIndex = 0;
      this.colorIndex = 0;
      this.colors = pastel();

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


   drawKeyPair(x, y, color, t1, t2, title) {
      textSize(20);

      fill(color);
      rect(x,      y, 35, 35, 5);
      rect(x + 40, y, 35, 35, 5);

      textAlign(LEFT);
      text(title, x + 85, y + 25);

      fill(0, 0, 0);

      textAlign(CENTER);
      textSize(25);
      text(t1, x + 18, y + 25);
      text(t2, x + 57, y + 26);
   }

   drawKey(x, y, color, t1, title) {
      fill(color);

      rect(x, y, 35, 35, 5);

      textAlign(LEFT);
      textSize(20);
      text(title, x + 45, y + 25);

      fill(0, 0, 0);

      textAlign(CENTER);
      textSize(25);
      text(t1, x + 18, y + 25);
   }

   drawArrowKeys(x, y, color, title) {
      fill(color);

      rect(x, y, 35, 35, 5);
      rect(x + 40, y, 35, 35, 5);
      rect(x + 40, y - 40, 35, 35, 5);
      rect(x + 80, y, 35, 35, 5);

      textAlign(LEFT);
      textSize(20);
      text(title, x + 10, y + 55);

      fill(255, 255, 255);
      strokeWeight(2);

      // Left
      line(x + 8, y + 18, x + 28, y + 18);
      line(x + 8, y + 18, x + 16, y + 10);
      line(x + 8, y + 18, x + 16, y + 26);

      // Right
      line(x + 88, y + 18,  x + 108, y + 18);
      line(x + 108, y + 18, x + 100, y + 10);
      line(x + 108, y + 18, x + 100, y + 26);

      // Up
      line(x + 57, y - 13, x + 57, y - 33);
      line(x + 57, y - 33, x + 49, y - 24);
      line(x + 57, y - 33, x + 65, y - 24);

      // Down
      line(x + 57, y + 8,  x + 57, y + 27);
      line(x + 57, y + 27, x + 49, y + 18);
      line(x + 57, y + 27, x + 65, y + 18);
   }

   drawSpacebar(x, y, color, t1, title) {
      fill(color);

      rect(x, y, 115, 35, 5);

      strokeWeight(1);
      textAlign(LEFT);
      textSize(20);
      text(title, x + 26, y + 55);

      fill(0, 0, 0);

      textAlign(CENTER);
      textSize(25);
      text(t1, x + 57, y + 24);
   }

   drawTitle(x, y, color, title, subtitle) {
      textAlign(CENTER);
      textSize(30);
      text(title, x, y);

      textSize(20);
      text(subtitle, x, y + 35);
   }

   drawMenu() {
      strokeWeight(1);
      textFont('Courier New');

      if (this.currentFrame % 3 == 0) {
         this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      }

      var color = this.colors[this.colorIndex];
      fill(color);

      textAlign(LEFT);
      textSize(25);

      var menuWidth = 512;
      var menuHeight = 256;
      var x = (this.canvas.width - menuWidth) / 2;
      var y = (this.canvas.height - menuHeight) / 2;

      this.drawTitle(350, 50, color, 'Henry Clay', 'The Friendly Snake');
      this.drawKeyPair(x, y,  color, 'S', 's', '+/- Speed');
      this.drawKeyPair(x, y + 50,  color, 'B', 'b', '+/- Block Size');
      this.drawKeyPair(x, y + 100, color,  'T', 't', '+/- Thickness');

      this.drawKey(x + 300, y,     color, 'f', 'Fullscreen');
      this.drawKey(x + 300, y + 50,     color, 'c', 'Color');
      this.drawKey(x + 300, y + 100,     color, 'l', 'Loop');
      this.drawKey(x + 300, y + 150,     color, 'g', 'Grid');
      this.drawKey(x + 300, y + 200,     color, 'r', 'Reset Settings');

      this.drawSpacebar(x, y + 200, color, 'Space', 'Pause');
      this.drawArrowKeys(x + 150, y + 200, color, 'Movement');

      strokeWeight(settings.borderWidth);
   }
}
