function Snake() {
   this.x = 0;
   this.y = 0;
   this.xspeed = 1;
   this.yspeed = 0;
   this.queued = 0;
   this.tail = [];

   this.currentDirection = RIGHT_ARROW;
   this.queuedDirection = null;
   this.bufferDirection = null;

   this.eat = function(pos) {
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
         this.queued += 3;
         return true;
      } else {
         return false;
      }
   }

   this.setDirection = function(x, y) {
      this.xspeed = x;
      this.yspeed = y;
   }

   this.overlaps = function(pos) {
      if (this.x === pos.x && this.y === pos.y) {
         return true;
      }

      var i = 0;
      for (i = 0; i < this.tail.length; i++) {
         if (this.tail[i].x == pos.x &&
             this.tail[i].y == pos.y) {
            return true;
         }
      };
   }

   this.queueDirection = function(newDirection) {
      if (this.canChangeDirectionTo(newDirection)) {
         if (this.queuedDirection === null) {
            this.queuedDirection = newDirection;
         } else if (this.bufferDirection === null) {
            this.bufferDirection = newDirection;
         }
      }
   }

   this.canChangeDirectionTo = function(newDirection) {
      if (this.bufferDirection) {
         return false;
      }

      switch(this.queuedDirection || this.currentDirection) {
      case UP_ARROW:
         return newDirection !== DOWN_ARROW;
      case DOWN_ARROW:
         return newDirection !== UP_ARROW;
      case RIGHT_ARROW:
         return newDirection !== LEFT_ARROW;
      case LEFT_ARROW:
         return newDirection !== RIGHT_ARROW;
      case null:
         return true;
      }

      return false;
   }

   this.updateDirection = function() {
      if (this.queuedDirection !== null) {
         this.currentDirection = this.queuedDirection;
         if (this.queuedDirection === UP_ARROW) {
            this.setDirection(0, -1);
         } else if (this.queuedDirection === DOWN_ARROW) {
            this.setDirection(0, 1);
         } else if (this.queuedDirection === RIGHT_ARROW) {
            this.setDirection(1, 0);
         } else if (this.queuedDirection === LEFT_ARROW) {
            this.setDirection(-1, 0);
         }

         this.queuedDirection = this.bufferDirection;
         this.bufferDirection = null;
      }
   }

   this.kill = function() {
      this.queued = 0;
      this.tail = [];
      this.queuedDirection = null;
      this.bufferDirection = null;
   }

   this.update = function() {
      this.updateDirection();

      var newHead = createVector(
         this.x + this.xspeed,
         this.y + this.yspeed
      );

      var tailCollision = true;
      // Add transparency for effect
      if (tailCollision && this.overlaps(newHead)) {
         return this.kill();
      }

      this.tail.push(createVector(this.x, this.y));

      if (this.queued === 0) {
         this.tail.shift();
      } else {
         this.queued--;
      }

      this.x = newHead.x;
      this.y = newHead.y;

      if (loopEnabled) {
         if (this.x < 0) {
            this.x = game.cols - 1;
         }

         if (this.y < 0) {
            this.y = game.rows - 1;
         }

         this.x %= game.cols;
         this.y %= game.rows;
      } else {
         this.x = constrain(this.x, 0, game.cols - 1);
         this.y = constrain(this.y, 0, game.rows - 1);
         if (!newHead.equals(this.x, this.y)) {
            this.currentDirection = null;
            return this.kill();
         }
      }

      if (this.overlaps(food)) {
         this.queued += 5;
         food.pickLocation();
      }
   }

   this.draw = function() {
      var i = 0;
      fill(colors[i]);
      this.tail.forEach(function(element) {
         fill(colors[i]);
         rect(element.x * blockSize, element.y * blockSize, blockSize, blockSize);
         i = (i + 1) % colors.length;
      }, this);

      rect(this.x * blockSize, this.y * blockSize, blockSize, blockSize);
   }
}
