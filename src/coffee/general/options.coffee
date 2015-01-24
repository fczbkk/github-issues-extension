window.addEventListener 'load', ->

  # list of all options and their default values
  defaults =
    hideChanges: true
    hideReassignments: true
    hideMilestones: true
    plusOneShowSummary: true
    plusOneThumbsUp: true
    plusOneHide: true
    emoji: 'hide'

  # get all options and their values, use defaults for options that are not
  # saved yet
  getOptions defaults, (options) ->


    checkboxes = [
      'hideChanges'
      'hideReassignments'
      'hideMilestones'
      'plusOneShowSummary'
      'plusOneThumbsUp'
      'plusOneHide'
    ]

    for item in checkboxes
      elm = document.getElementById item
      elm.checked = options[item]

      do (item) ->
        elm.addEventListener 'change', (event) ->
          target_element = event.target
          options = {}
          options[item] = target_element.checked
          chrome.storage.sync.set options


    # emojis

    for elm in document.getElementsByName 'emoji'
      elm.checked = elm.value is options.emoji
      elm.addEventListener 'change', ->
        selected = document.querySelector 'input[name="emoji"]:checked'
        chrome.storage.sync.set emoji: selected.value
