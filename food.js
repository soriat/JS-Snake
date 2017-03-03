function Food() {
   this.x = 0;
   this.y = 0;
   this.colorIndex = 0;
   this.colors = shadesOf('red');

   this.pickLocation = function() {
      var cols = canvas.width / blockSize;
      var rows = canvas.height / blockSize;

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
         //ceil(this.x * blockSize + blockSize/2),
         //ceil(this.y * blockSize + blockSize/2),
         //ceil(blockSize/1.35),
         //ceil(blockSize/1.35)
      //);
      rect(this.x * blockSize, this.y * blockSize, blockSize, blockSize);
      //stroke(0);

      var x = this.x * blockSize;
      var y = (this.y + 1) * blockSize;

      // |\
      //triangle(x, y,
               //x, y - blockSize,
               //x + blockSize, y);

      // /|
      //triangle(x + blockSize, y - blockSize,
               //x, y - blockSize,
               //x + blockSize, y);

   }
}
