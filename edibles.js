class Edibles {
   constructor() {
      this.green = null;
   }

   init() {
      this.green = new Edible('green');
   }

   draw() {
      if (this.green) {
         this.green.draw();
      }
   }

   clear() {
      this.green = null;
   }

   update() {
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
}
