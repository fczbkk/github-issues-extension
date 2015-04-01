(function() {
  var link_element, menu_element;

  menu_element = document.querySelector('.menu');

  link_element = document.createElement('a');

  link_element.appendChild(document.createTextNode('GitHub Issues extension'));

  link_element.className = 'menu-item';

  link_element.href = chrome.extension.getURL('options.html');

  link_element.target = '_blank';

  menu_element.appendChild(link_element);

}).call(this);
