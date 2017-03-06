class Edible {
   constructor(color) {
      this.pos = null;
      this.colorIndex = 0;
      this.colors = shadesOf(color);
      this.pickLocation();
   }

   //offscreen rename
   isOutsideBounds() {
      return this.pos.x >= game.cols ||
             this.pos.y >= game.rows;
   }

   pickLocation() {
      while (1) {
         var randomPos = createVector(
            floor(random(game.cols)),
            floor(random(game.rows))
         );

         if (!snake.overlaps(randomPos) && !edibles.overlaps(randomPos)) {
            this.pos = randomPos;
            break;
         }
      }
   }

   draw() {
      fill(this.colors[this.colorIndex]);
      rect(
         this.pos.x * settings.blockSize,
         this.pos.y * settings.blockSize,
         settings.blockSize, settings.blockSize
      );

      if (game.currentFrame % 2 === 0) {
         this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      }
   }
}
