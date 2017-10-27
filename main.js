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
      case UP_ARROW:
      case DOWN_ARROW:
      case RIGHT_ARROW:
      case LEFT_ARROW:
      case 32: // Spacebar
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
      case 80: // p: Pause
         game.togglePause();
         break;
      }
   } else if (game.isPaused()) {
      if (keyCode === 32 || keyCode == 80) {
         game.state = 'Active';
      }
   }

   // Global actions
   switch(keyCode) {
   case 66: // b: Block Size
      settings.update('blockSize', event.shiftKey);
      break;
   case 67: // c: Color
      settings.update('color', event.shiftKey);
      break;
   case 82: // r: Reset
      settings = new Settings();
      settings.updateParams();
      game.resize();
      break;
   case 83: // s: Speed
      settings.update('speed', event.shiftKey);
      break;
   case 84: // t: Thickness
      settings.update('thickness', event.shiftKey);
      break;
   case 70: // f: Toggle fullscreen
      settings.toggleFullscreen();
      break;
   case 71: // g: Toggle Grid
      settings.toggleGrid();
      break;
   case 76: // l: Toggle Loop
      settings.toggleLoop();
      break;
   }
}

function draw() {
   strokeWeight(settings.borderWidth);
   background(20);

   if (settings.gridEnabled) {
      for (var x = 0; x < game.cols; x++) {
         line(x * settings.blockSize, 0, x * settings.blockSize, height);
      }

      for (var y = 0; y < game.rows; y++) {
         line(0, y * settings.blockSize, width,  y * settings.blockSize);
      }
   }

   snake.draw();

   if (game.state == 'Paused') {
      game.drawSettings();
   } else if (game.currentFrame % settings.gameSpeed === 0) {
      snake.update();
      edibles.update();
   }

   if (game.state == 'Settings') {
      game.drawSettings();
   } else {
      edibles.draw();
   }

   game.currentFrame = frameCount % 60;
}
