(function() {
  var createElement;

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

}).call(this);
