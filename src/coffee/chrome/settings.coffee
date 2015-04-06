getSettingsLink = ->
  element = constructSettingsLink()
  element.href = chrome.extension.getURL 'options.html'
  element.target = 'github-extension-settings'
  element
