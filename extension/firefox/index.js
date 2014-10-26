(function() {
  var include_pattern, pageMod, self;

  self = require('sdk/self');

  pageMod = require('sdk/page-mod');

  include_pattern = /.*:\/\/(.*\.)*github\.com\/.*\/issues\/.+/;

  pageMod.PageMod({
    include: include_pattern,
    contentScriptFile: self.data.url('content.js'),
    contentStyleFile: self.data.url('content.css')
  });

}).call(this);
