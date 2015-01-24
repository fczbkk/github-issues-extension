(function() {
  var createElement, getOptions;

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

  getOptions = function(list, callback) {
    if (list == null) {
      list = null;
    }
    if (callback == null) {
      callback = function() {};
    }
    return chrome.storage.sync.get(list, function(options) {
      return callback(options);
    });
  };

  window.addEventListener('load', function() {
    var defaults;
    defaults = {
      hideChanges: true,
      hideReassignments: true,
      hideMilestones: true,
      plusOneShowSummary: true,
      plusOneThumbsUp: true,
      plusOneHide: true,
      emoji: 'hide'
    };
    return getOptions(defaults, function(options) {
      var checkboxes, elm, item, _fn, _i, _j, _len, _len1, _ref, _results;
      checkboxes = ['hideChanges', 'hideReassignments', 'hideMilestones', 'plusOneShowSummary', 'plusOneThumbsUp', 'plusOneHide'];
      _fn = function(item) {
        return elm.addEventListener('change', function(event) {
          var target_element;
          target_element = event.target;
          options = {};
          options[item] = target_element.checked;
          return chrome.storage.sync.set(options);
        });
      };
      for (_i = 0, _len = checkboxes.length; _i < _len; _i++) {
        item = checkboxes[_i];
        elm = document.getElementById(item);
        elm.checked = options[item];
        _fn(item);
      }
      _ref = document.getElementsByName('emoji');
      _results = [];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        elm = _ref[_j];
        elm.checked = elm.value === options.emoji;
        _results.push(elm.addEventListener('change', function() {
          var selected;
          selected = document.querySelector('input[name="emoji"]:checked');
          return chrome.storage.sync.set({
            emoji: selected.value
          });
        }));
      }
      return _results;
    });
  });

}).call(this);
