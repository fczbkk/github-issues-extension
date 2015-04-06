getSettingsLink = ->
  element = constructSettingsLink()
  element.href = 'javascript:void(0);'

  element.addEventListener 'click', ->
    self.port.emit 'openSettingsPage'

  element
