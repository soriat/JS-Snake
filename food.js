function Food() {
   this.x = 0;
   this.y = 0;
   this.colorIndex = 0;
   this.colors = shadesOf('white');

   this.pickLocation = function() {
      var cols = canvas.width / settings.blockSize;
      var rows = canvas.height / settings.blockSize;

      while (1) {
         var pos = createVector(
          floor(random(cols)),
          floor(random(rows)));

         if (!snake.overlaps(pos)) {
            this.x = pos.x;
            this.y = pos.y;
            break;
         }
      }
   }

   this.draw = function() {
      fill(this.colors[this.colorIndex]);
      if (game.currentFrame % 2 === 0) {
         this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      }

      //strokeWeight(3);
      //ellipse(
         //ceil(this.x * settings.blockSize + settings.blockSize/2),
         //ceil(this.y * settings.blockSize + settings.blockSize/2),
         //ceil(settings.blockSize/1.35),
         //ceil(settings.blockSize/1.35)
      //);
      rect(this.x * settings.blockSize, this.y * settings.blockSize, settings.blockSize, settings.blockSize);
      //stroke(0);

      var x = this.x * settings.blockSize;
      var y = (this.y + 1) * settings.blockSize;

      // |\
      //triangle(x, y,
               //x, y - settings.blockSize,
               //x + settings.blockSize, y);

      // /|
      //triangle(x + settings.blockSize, y - settings.blockSize,
               //x, y - settings.blockSize,
               //x + settings.blockSize, y);

   }
}
