(function() {
  var addSidebarItem, createElement, getOptions, hide_options, plus_one_options;

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
    self.port.emit('getOptions', list);
    return self.port.on('receiveOptions', function(options) {
      return callback(options);
    });
  };

  addSidebarItem = function(title, content, wrapper_class, content_class) {
    var content_element, element, sidebar_element, title_element, wrapper_element;
    if (title == null) {
      title = '';
    }
    if (content == null) {
      content = null;
    }
    if (wrapper_class == null) {
      wrapper_class = '';
    }
    if (content_class == null) {
      content_class = '';
    }
    element = createElement('div', {
      "class": 'discussion-sidebar-item sidebar-plusone'
    });
    wrapper_element = createElement('div', {
      "class": wrapper_class
    });
    title_element = createElement('h3', {
      "class": 'discussion-sidebar-heading'
    }, title);
    content_element = createElement('div', {
      "class": content_class
    });
    content_element.appendChild(content);
    wrapper_element.appendChild(title_element);
    wrapper_element.appendChild(content_element);
    element.appendChild(wrapper_element);
    sidebar_element = document.querySelector('.discussion-sidebar');
    return sidebar_element.appendChild(element);
  };

  hide_options = {
    hideChanges: true,
    hideReassignments: true,
    hideMilestones: true,
    plusOneHide: true
  };

  getOptions(hide_options, function(options) {
    var key, option_pairs, val, _results;
    option_pairs = {
      hideChanges: 'hide-label-changes',
      hideReassignments: 'hide-assignment-changes',
      hideMilestones: 'hide-milestone-changes',
      plusOneHide: 'hide-plus-one-comments'
    };
    _results = [];
    for (key in option_pairs) {
      val = option_pairs[key];
      if (options[key] === true) {
        _results.push(document.body.classList.add(val));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  });

  plus_one_options = {
    plusOneShowSummary: true,
    plusOneThumbsUp: true,
    plusOneHide: true
  };

  getOptions(plus_one_options, function(options) {
    var content_element, element, getParticipantInfo, getUserIcon, id, isThumbsUpImg, onlyContains, participant, participants, plus_one_count, sidebar_content, startsWithPlusOne, _i, _len, _ref;
    participants = {};
    isThumbsUpImg = function(node) {
      var result;
      result = false;
      if ((node != null ? node.tagName : void 0) === 'IMG') {
        if (node.getAttribute('class') === 'emoji') {
          if (node.getAttribute('alt') === ':+1:') {
            result = true;
          }
        }
      }
      return result;
    };
    startsWithPlusOne = function(element) {
      var content, result;
      result = false;
      content = element.textContent;
      if (/^\s*\+1/.test(element.textContent)) {
        result = true;
      }
      if (options.plusOneThumbsUp) {
        if (isThumbsUpImg(element.querySelector('p').firstChild)) {
          result = true;
        }
      }
      return result;
    };
    onlyContains = function(element) {
      var children, contains_no_text, content, paragraphs, result;
      result = false;
      content = element.textContent;
      /^\s*\+1.{0,1}\s*$/.test(content);
      if (options.plusOneThumbsUp) {
        paragraphs = element.querySelectorAll('p');
        if (paragraphs.length === 1) {
          children = paragraphs[0].childNodes;
          contains_no_text = /^\s*$/.exec(paragraphs[0].textContent);
          if (contains_no_text && isThumbsUpImg(children[0])) {
            result = true;
          }
        }
      }
      return result;
    };
    getParticipantInfo = function(node) {
      var avatar, link;
      link = node.querySelector('a');
      avatar = link.querySelector('img');
      return {
        id: avatar.dataset.user,
        url: link.href,
        name: avatar.alt
      };
    };
    getUserIcon = function(user) {
      var icon, link;
      if (user == null) {
        user = {};
      }
      icon = createElement('img', {
        alt: user.name,
        width: '20',
        height: '20',
        "class": 'avatar',
        src: "https://avatars0.githubusercontent.com/u/" + user.id + "?v=2&s=40"
      });
      link = createElement('a', {
        href: user.url,
        "class": 'participant-avatar'
      });
      link.appendChild(icon);
      return link;
    };
    _ref = document.querySelectorAll('.timeline-comment-wrapper');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      content_element = element.querySelector('.comment-body');
      if (startsWithPlusOne(content_element)) {
        participant = getParticipantInfo(element);
        participants[participant.id] = participant;
      }
      if (onlyContains(content_element)) {
        element.classList.add('plus-one-comment');
      }
    }
    if (options.plusOneShowSummary) {
      plus_one_count = Object.keys(participants).length;
      if (plus_one_count > 0) {
        sidebar_content = document.createDocumentFragment();
        for (id in participants) {
          participant = participants[id];
          sidebar_content.appendChild(getUserIcon(participant));
        }
        return addSidebarItem("+1 (" + plus_one_count + "×)", sidebar_content, 'participation', 'participation-avatars');
      }
    }
  });

  getOptions({
    emoji: 'hide'
  }, function(options) {
    var elm, replacement_node, replacement_text, _i, _len, _ref, _results;
    switch (options.emoji) {
      case 'hide':
        return document.body.classList.add('hide-emoji');
      case 'text':
        _ref = document.querySelectorAll('img.emoji');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elm = _ref[_i];
          replacement_text = elm.getAttribute('alt').replace(/\:/g, '');
          replacement_node = document.createTextNode(replacement_text);
          elm.parentNode.insertBefore(replacement_node, elm);
          _results.push(elm.parentNode.removeChild(elm));
        }
        return _results;
    }
  });

}).call(this);
