constructSettingsLink = ->
  element = document.createElement 'a'
  element.appendChild document.createTextNode 'GitHub Issues extension'
  element.className = 'menu-item'
  element


menu_element = document.querySelector '.menu'
menu_element.appendChild getSettingsLink()
