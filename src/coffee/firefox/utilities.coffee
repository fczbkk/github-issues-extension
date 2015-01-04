# retrieves options for Firefox
getOptions = (list = null, callback = ->) ->

  self.port.emit 'getOptions', list

  self.port.on 'receiveOptions', (options) ->
    callback options
