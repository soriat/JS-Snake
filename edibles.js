function Edibles() {
   this.green = null;

   this.init = function() {
      this.green = new Edible();
      this.green.init('green');
   }

   this.draw = function() {
      if (this.green) {
         this.green.draw();
      }
   }

   this.clear = function() {
      this.green = null;
   }

   this.update = function() {
      var head = snake.getHead();

      if (this.green.pos.equals(head)) {
         snake.queued += 3;
         this.green.pickLocation();
      }
   }

   this.overlaps = function(pos) {
      return false;
   }
}
