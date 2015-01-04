(function() {
  var include_pattern, pageMod, prefs, self, startListening;

  self = require('sdk/self');

  pageMod = require('sdk/page-mod');

  prefs = require('sdk/simple-prefs').prefs;

  include_pattern = /.*:\/\/(.*\.)*github\.com\/.*\/issues\/.+/;

  startListening = function(worker) {
    return worker.port.on('getOptions', function(list) {
      var key, result, val;
      if (list == null) {
        list = null;
      }
      result = {};
      if (list) {
        for (key in list) {
          val = list[key];
          result[key] = prefs[key] || val;
        }
      } else {
        result = prefs;
      }
      return worker.port.emit('receiveOptions', result);
    });
  };

  pageMod.PageMod({
    include: include_pattern,
    contentScriptFile: self.data.url('content.js'),
    contentStyleFile: self.data.url('content.css'),
    onAttach: startListening
  });

}).call(this);
