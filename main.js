function setup() {
   settings = new Settings();
   settings.parseParams();

   game = new Game();
   grid = new Grid();
   snake = new Snake();
   edibles = new Edibles();

   game.init();
}

function mousePressed() {
   snake.queued = 100;
}

function keyPressed() {
   if (game.state === 'Settings') {
      switch(keyCode) {
      case 32: // Spacebar
      case 83: //s
         //reinit game.
         game.activate();
         break;
      }
   } else if (game.state === 'Active') {
      switch(keyCode) {
      case UP_ARROW:
      case DOWN_ARROW:
      case RIGHT_ARROW:
      case LEFT_ARROW:
         snake.queueDirection(keyCode);
         break;
      case 32: // Spacebar
      case 80: //p
         game.togglePause();
         break;
      case 83: //s
         game.state = 'Settings';
         game.clear();
      }
   } else if (game.state === 'Paused') {
      if (keyCode === 32 || keyCode == 80) {
         game.state = 'Active';
      }
   }

   // Global actions
   switch(keyCode) {
      case 70: //f
         fullscreen(!fullscreen());
         break;
      case 71: //g
         settings.gridEnabled = !settings.gridEnabled;
         settings.updateParams();
         break;
      case 76: //l
         settings.loopEnabled = !settings.loopEnabled;
         settings.updateParams();
         break;
   }
}

function draw() {
   strokeWeight(settings.borderWidth);
   background(20);

   if (game.state == 'Settings') {
      return game.drawMenu();
   }

   edibles.draw();
   snake.draw();

   if (settings.gridEnabled) {
      for (var i = 0; i < game.cols; i++) {
         line(i * settings.blockSize, 0, i * settings.blockSize, height);
      }

      for (var i = 0; i < game.rows; i++) {
         line(0, i * settings.blockSize, width,  i * settings.blockSize);
      }
   }

   if (game.state == 'Paused') {
      game.drawPaused();
   } else {
      if (game.currentFrame % settings.gameSpeed === 0) {
         snake.update();
         edibles.update();
      }
   }

   game.currentFrame = (game.currentFrame + 1) % 60;
}
