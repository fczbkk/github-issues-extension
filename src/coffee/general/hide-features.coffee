hide_options =
  hideChanges: true
  hideReassignments: true
  hideMilestones: true
  plusOneHide: true

getOptions hide_options, (options) ->

  option_pairs =
    hideChanges: 'hide-label-changes'
    hideReassignments: 'hide-assignment-changes'
    hideMilestones: 'hide-milestone-changes'
    plusOneHide: 'hide-plus-one-comments'

  for key, val of option_pairs
    document.body.classList.add val if options[key] is true
