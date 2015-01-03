createElement = (tag = '', attributes = {}, content = null) ->
  element = document.createElement tag
  element.setAttribute key, val for key, val of attributes
  element.appendChild document.createTextNode content if content?
  element
