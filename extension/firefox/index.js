(function() {
  var createElement, include_pattern, pageMod, self;

  createElement = function(tag, attributes, content) {
    var element, key, val;
    if (tag == null) {
      tag = '';
    }
    if (attributes == null) {
      attributes = {};
    }
    if (content == null) {
      content = null;
    }
    element = document.createElement(tag);
    for (key in attributes) {
      val = attributes[key];
      element.setAttribute(key, val);
    }
    if (content != null) {
      element.appendChild(document.createTextNode(content));
    }
    return element;
  };

  self = require('sdk/self');

  pageMod = require('sdk/page-mod');

  include_pattern = /.*:\/\/(.*\.)*github\.com\/.*\/issues\/.+/;

  pageMod.PageMod({
    include: include_pattern,
    contentScriptFile: self.data.url('content.js'),
    contentStyleFile: self.data.url('content.css')
  });

}).call(this);
