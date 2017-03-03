var snake;
var grid;
var game;
var food;

function setup() {
   settings = new Settings();
   settings.parseParams();

   game = new Game();
   snake = new Snake();
   grid = new Grid();
   food = new Food();

   game.init();
   food.pickLocation();
}

function mousePressed() {
}

function keyPressed() {
   switch(keyCode) {
   case UP_ARROW:
   case DOWN_ARROW:
   case RIGHT_ARROW:
   case LEFT_ARROW:
      if (game.state === 'Menu') {
      }
      if (!game.paused) {
         snake.queueDirection(keyCode);
      }
      break;
   case 70: //f
      fullscreen(!fullscreen());
      break;
   case 71: //g
      grid.toggleShow();
      break;
   case 72: //h
      game.scale(1);
      break;
   case 73: //i
      game.scale(-1);
      break;
   case 76: //l
      loopEnabled = !loopEnabled;
      break;
   case 80: //p
      game.togglePause();
      break;
   }
}

function draw() {
   strokeWeight(settings.borderWidth);
   background(20);

   if (game.state == 'Menu') {
      game.drawMenu();
   } else {
      if (!game.paused && game.currentFrame % settings.gameSpeed === 0) {
         snake.update();
      }

      food.draw();
      snake.draw();
      grid.draw();
   }

   game.currentFrame = (game.currentFrame + 1) % 60;
}
