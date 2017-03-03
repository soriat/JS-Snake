function isTruthy(value) {
   return value === '1' || value === 'on';
}

function isInt(value) {
   return !isNaN(value) && (function(x) {
      return (x | 0) === x;
   })(parseFloat(value))
}

function enforceInt(value, defaultValue) {
   return isInt(value) ? Number(value) : defaultValue;
}

function updateQueryStringParameter(uri, key, value) {
   var regex = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
   return uri.match(regex) ?
    uri.replace(regex, '$1' + key + "=" + value + '$2') :
    uri + (uri.indexOf('?') !== -1 ? "&" : "?") + key + "=" + value;
}
