self = require 'sdk/self'
pageMod = require 'sdk/page-mod'
prefs = require('sdk/simple-prefs').prefs


# e.g. 'https://github.com/fczbkk/github-issues-extension/issues/2'
include_pattern = ///
  # any protocol
  .*://
  # any subdomain at github.com
  (.*\.)*github\.com/
  # issues in any project under any user
  .*/(issues|pull)/
  # issue detail
  .+
///


# communication between content script and main script
# mainly used to retrieve options from preferences
startListening = (worker) ->

  worker.port.on 'getOptions', (list = null) ->
    result = {}

    if list
      result[key] = prefs[key] or val for key, val of list
    else
      result = prefs

    worker.port.emit 'receiveOptions', result


pageMod.PageMod
  include: include_pattern
  contentScriptFile: self.data.url 'content.js'
  contentStyleFile: self.data.url 'content.css'
  onAttach: startListening
