(function() {
  var addSidebarItem;

  addSidebarItem = function(title, content, wrapper_class, content_class) {
    var element, sidebar_element;
    if (title == null) {
      title = '';
    }
    if (content == null) {
      content = '';
    }
    if (wrapper_class == null) {
      wrapper_class = '';
    }
    if (content_class == null) {
      content_class = '';
    }
    sidebar_element = document.querySelector('.discussion-sidebar');
    element = document.createElement('div');
    element.innerHTML = "    <div class='discussion-sidebar-item sidebar-plusone'>      <div class='" + wrapper_class + "'>        <h3 class='discussion-sidebar-heading'>" + title + "</h3>        <div class='" + content_class + "'>" + content + "</div>      </div>    </div>  ";
    return sidebar_element.appendChild(element);
  };

  document.body.classList.add('hide-label-changes');

  document.body.classList.add('hide-assignment-changes');

  document.body.classList.add('hide-emoji');

  document.body.classList.add('hide-plus-one-comments');

  (function() {
    var content, element, getParticipantInfo, getUserIcon, id, onlyContains, participant, participants, plus_one_count, sidebar_content, sidebar_title, startsWith, _i, _len, _ref;
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
      if (user == null) {
        user = {};
      }
      return "      <a href='" + user.url + "' class='participant-avatar'><img        alt='" + user.name + "'        height='20'        width='20'        src='https://avatars0.githubusercontent.com/u/" + user.id + "?v=2&s=40'        class='avatar'      /></a>    ";
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
      sidebar_title = "+1 (" + plus_one_count + "&times;)";
      sidebar_content = ((function() {
        var _results;
        _results = [];
        for (id in participants) {
          participant = participants[id];
          _results.push(getUserIcon(participant));
        }
        return _results;
      })()).join('');
      return addSidebarItem(sidebar_title, sidebar_content, 'participation', 'participation-avatars');
    }
  })();

}).call(this);
