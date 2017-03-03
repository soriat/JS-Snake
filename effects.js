// From https://krazydad.com/tutorials/makecolors.php
function makeColorGradient(
   frequency1, frequency2, frequency3,
   phase1, phase2, phase3,
   center, width, len) {

   var noDuplicates = false;

   if (center == undefined) {
      center = 128;
   }
   if (width == undefined) {
      width = 127;
   }
   if (len == undefined) {
      len = 255;
      noDuplicates = true;
   }

   var colors = [];
   for (var i = 0; i < len; ++i) {
      var r = Math.sin(frequency1 * i + phase1) * width + center;
      var g = Math.sin(frequency2 * i + phase2) * width + center;
      var b = Math.sin(frequency3 * i + phase3) * width + center;

      var newColor = color(r, g, b);

      if (noDuplicates && newColor in colors) {
         return colors;
      }

      colors.push(newColor);
   }

   return colors;
}

function cap(colors, rLimit, gLimit, bLimit) {
   var filteredColors = [];

   colors.forEach(function(color) {
      if ((rLimit !== 0 && red(color)   < rLimit) ||
          (gLimit !== 0 && green(color) < gLimit) ||
          (bLimit !== 0 && blue(color)  < bLimit)) {
         return;
      }
      filteredColors.push(color);
   });

   return filteredColors;
}

function shadesOf(color) {
   var r = 0;
   var g = 0;
   var b = 0;
   // Lower limit of colors
   var limit = 125;
   // Color multiplier (higher = brighter)
   var width = 300;

   switch(color) {
   case 'red':
      r = 1;
      break;
   case 'green':
      g = 1;
      break;
   case 'blue':
      b = 1;
      break;
   case 'purple':
      r = b = 1;
      width = 250;
   case 'yellow':
      r = g = 1;
      break;
   case 'cyan':
      g = b = 1;
      break;
   }

   var colors = makeColorGradient(
      .05 * r, .05 * g, .05 * b,
      r, g, b,
      0, width
   );

   return cap(colors, r * limit, g * limit, b * limit);
}

function rainbow() {
   var piMagic = Math.PI / 3;
   return makeColorGradient(
      .025, .025, .025,
      0, 2 * piMagic, 4 * piMagic
   );
}

function pastel() {
   var piMagic = Math.PI / 3;
   return makeColorGradient(
      .025, .025, .025,
      0, 2 * piMagic, 4 * piMagic,
      200, 55
   );
}

// name themes
