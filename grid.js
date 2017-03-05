function Grid() {
   this.draw = function() {
      for (var i = 0; i < game.cols; i++) {
         line(i * settings.blockSize, 0, i * settings.blockSize, height);
      }

      for (var i = 0; i < game.rows; i++) {
         line(0, i * settings.blockSize, width,  i * settings.blockSize);
      }
   }
}
