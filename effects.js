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
   case 'yellow':
      r = g = 1;
      break;
   case 'cyan':
      g = b = 1;
      break;
   case 'white':
      r = g = b = 1;
      break;
   }

   var colors = makeColorGradient(
      .05 * r, .05 * g, .05 * b,
      r, g, b,
      0, width
   );

   return cap(colors, r * limit, g * limit, b * limit);
}

function test() {
   return linearGradient([
      color('#ADD5F7'),
      color('#7FB2F0'),
      color('#4E7AC7'),
      color('#35478C')
   ], .03, true);
}

function sky() {
   return linearGradient([
      color('#ADD5F7'),
      color('#7FB2F0'),
      color('#4E7AC7'),
      color('#35478C')
   ], .03, true);
}

function linearGradient(colors, step, mirror) {
   var gradient = [];
   for (var i = 0; i < colors.length - 1; i++) {
      gradient.push(colors[i]);
      for (var j = 0; j < 1; j += (step ? step : .03)) {
         gradient.push(lerpColor(colors[i], colors[i + 1], j));
      }
   }

   if (mirror) {
      return mirrorArray(gradient);
   }

   for (var j = 0; j < 1; j += (step ? step : .03)) {
      gradient.push(lerpColor(colors[i], colors[0], j));
   }

   return gradient;
}

function mirrorArray(values) {
    return concat(values, reverse(values.slice(0)));
}

function vipera() {
   var white = color(255, 255, 255);
   var grey1 = color(238, 233, 233);
   var grey2 = color(205, 201, 201);
   var grey3 = color(139, 137, 137);

   return [
      white, white, white,
      grey1, grey1, grey1,
      grey2, grey2, grey2,
      grey3, grey3, grey3
   ];
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
