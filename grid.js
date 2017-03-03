function Grid() {
   this.show = true;

   this.toggleShow = function() {
      this.show = !this.show;
   }

   this.draw = function() {
      if (!this.show) {
         return;
      }

      var cols = width/blockSize;
      //console.log(width, blockSize, width/blockSize);
      for (var i = 0; i < cols; i++) {
         line(i * blockSize, 0, i * blockSize, height);
      }

      var rows = height/blockSize;
      //console.log(rows, blockSize, rows/blockSize);
      for (var i = 0; i < rows; i++) {
         line(0, i * blockSize, width,  i * blockSize);
      }
   }
}
