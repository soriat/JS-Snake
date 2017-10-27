class Snake {
   constructor() {
      this.x = 0;
      this.y = 0;
      this.xspeed = 1;
      this.yspeed = 0;
      this.queued = 2;
      this.tail = [];

      this.currentDirection = RIGHT_ARROW;
      this.queuedDirection = null;
      this.bufferDirection = null;
   }

   setDirection(x, y) {
      this.xspeed = x;
      this.yspeed = y;
   }

   overlaps(pos) {
      if (!pos) {
         pos = createVector(this.x, this.y);
      } else if (this.x === pos.x && this.y === pos.y) {
         return true;
      }

      for (var i = 0; i < this.tail.length; i++) {
         if (this.tail[i].x == pos.x &&
             this.tail[i].y == pos.y) {
            return true;
         }
      };
   }

   queueDirection(newDirection) {
      if (this.canChangeDirectionTo(newDirection)) {
         if (this.queuedDirection === null) {
            this.queuedDirection = newDirection;
         } else if (this.bufferDirection === null) {
            this.bufferDirection = newDirection;
         }
      }
   }

   canChangeDirectionTo(newDirection) {
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

   updateDirection() {
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

   kill() {
      this.tail = [];
      this.queued = 2;
      this.queuedDirection = null;
      this.bufferDirection = null;
   }

   update() {
      this.updateDirection();

      this.tail.push(createVector(this.x, this.y));

      if (this.queued === 0) {
         this.tail.shift();
      } else {
         this.queued--;
         if (game.state == 'Active') {
            settings.updateParams();
         }
      }

      this.x += this.xspeed;
      this.y += this.yspeed;

      if (game.state == 'Settings') {
         // Right wall
         if (this.currentDirection == RIGHT_ARROW &&
          this.x == game.cols - 1) {
            this.queueDirection(DOWN_ARROW);
         } else if (this.currentDirection == DOWN_ARROW &&
          this.y == game.rows - 1) {
            this.queueDirection(LEFT_ARROW);
         } else if (this.currentDirection == LEFT_ARROW &&
          this.x == 0) {
            this.queueDirection(UP_ARROW);
         } else if (this.currentDirection == UP_ARROW &&
          this.y == 0) {
            this.queueDirection(RIGHT_ARROW);
         }

         this.x %= game.cols;
         this.y %= game.rows;
      } else if (settings.loopEnabled) {
         if (this.x < 0) {
            this.x = game.cols - 1;
         }

         if (this.y < 0) {
            this.y = game.rows - 1;
         }

         this.x %= game.cols;
         this.y %= game.rows;
      } else {
         var unconstrainedHead = this.getHead();
         this.x = constrain(this.x, 0, game.cols - 1);
         this.y = constrain(this.y, 0, game.rows - 1);

         if (!unconstrainedHead.equals(this.x, this.y)) {
            this.currentDirection = null;
            return this.kill();
         }
      }

      var tailCollision = true;
      // Add transparency for effect
      if (tailCollision && this.overlaps()) {
         return this.kill();
      }
   }

   draw() {
      var colorIndex = 0;

      this.tail.forEach(function(element) {
         fill(settings.colors[colorIndex]);
         rect(element.x * settings.blockSize,
              element.y * settings.blockSize,
              settings.blockSize, settings.blockSize);
         colorIndex = (colorIndex + 1) % settings.colors.length;
      }, this);

      fill(settings.colors[colorIndex]);
      rect(this.x * settings.blockSize,
           this.y * settings.blockSize,
           settings.blockSize, settings.blockSize);
   }

   getHead() {
      return createVector(this.x, this.y);
   }
}
