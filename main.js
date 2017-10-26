function setup() {
   settings = new Settings();
   settings.parseParams();

   game = new Game();
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

   if (settings.gridEnabled) {
      for (var x = 0; x < game.cols; x++) {
         line(x * settings.blockSize, 0, x * settings.blockSize, height);
      }

      for (var y = 0; y < game.rows; y++) {
         line(0, y * settings.blockSize, width,  y * settings.blockSize);
      }
   }

   edibles.draw();
   snake.draw();

   if (game.state == 'Paused') {
      game.drawPaused();
   } else {
      if (game.currentFrame % settings.gameSpeed === 0) {
         snake.update();
         edibles.update();
      }
   }

   game.currentFrame = frameCount % 60;
}
