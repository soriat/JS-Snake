class Edibles {
   constructor() {
      this.green = null;
   }

   clear() {
      this.green = null;
   }

   reset() {
      this.green = new Edible('green');
   }

   update() {
      if (!this.green) {
         return;
      }

      var head = snake.getHead();

      if (this.green.isOutsideBounds()) {
         this.green.pickLocation();
      } else if (this.green.pos.equals(head)) {
         snake.queued += 3;
         this.green.pickLocation();
      }
   }

   overlaps(pos) {
      return this.green && this.green.pos.equals(pos);
   }

   draw() {
      if (this.green) {
         this.green.draw();
      }
   }
}
