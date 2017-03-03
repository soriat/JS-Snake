function Grid() {
   this.show = true;

   this.toggleShow = function() {
      this.show = !this.show;
   }

   this.draw = function() {
      if (!this.show) {
         return;
      }

      var cols = width/settings.blockSize;
      for (var i = 0; i < cols; i++) {
         line(i * settings.blockSize, 0, i * settings.blockSize, height);
      }

      var rows = height/settings.blockSize;
      for (var i = 0; i < rows; i++) {
         line(0, i * settings.blockSize, width,  i * settings.blockSize);
      }
   }
}
