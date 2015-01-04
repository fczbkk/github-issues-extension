# retrieves options for Chrome
getOptions = (list = null, callback = ->) ->
  chrome.storage.sync.get list, (options) ->
    callback options
