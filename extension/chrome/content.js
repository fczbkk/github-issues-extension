(function() {
  var addSidebarItem, createElement;

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

  document.body.classList.add('hide-label-changes');

  document.body.classList.add('hide-assignment-changes');

  document.body.classList.add('hide-emoji');

  document.body.classList.add('hide-plus-one-comments');

  (function() {
    var content, element, getParticipantInfo, getUserIcon, id, onlyContains, participant, participants, plus_one_count, sidebar_content, startsWith, _i, _len, _ref;
    participants = {};
    startsWith = function(content) {
      if (content == null) {
        content = '';
      }
      return /^\s*\+1/.test(content);
    };
    onlyContains = function(content) {
      if (content == null) {
        content = '';
      }
      return /^\s*\+1.{0,1}\s*$/.test(content);
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
      content = element.querySelector('.comment-body').textContent;
      if (startsWith(content)) {
        participant = getParticipantInfo(element);
        participants[participant.id] = participant;
        if (onlyContains(content)) {
          element.classList.add('plus-one-comment');
        }
      }
    }
    plus_one_count = Object.keys(participants).length;
    if (plus_one_count > 0) {
      sidebar_content = document.createDocumentFragment();
      for (id in participants) {
        participant = participants[id];
        sidebar_content.appendChild(getUserIcon(participant));
      }
      return addSidebarItem("+1 (" + plus_one_count + "×)", sidebar_content, 'participation', 'participation-avatars');
    }
  })();

}).call(this);
