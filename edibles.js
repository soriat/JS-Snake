function Edibles() {
   this.green = null;

   this.init = function() {
      this.green = new Edible();
      this.green.init('green');
   }

   this.draw = function() {
      this.green.draw();
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
