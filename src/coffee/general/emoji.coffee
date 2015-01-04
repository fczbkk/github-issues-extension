getOptions {emoji: 'hide'}, (options) ->

  switch options.emoji

    when 'hide'
      document.body.classList.add 'hide-emoji'

    when 'text'
      for elm in document.querySelectorAll 'img.emoji'
        replacement_text = elm.getAttribute('alt').replace /\:/g, ''
        replacement_node = document.createTextNode replacement_text
        elm.parentNode.insertBefore replacement_node, elm
        elm.parentNode.removeChild elm
