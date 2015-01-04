plus_one_options =
  plusOneShowSummary: true
  plusOneThumbsUp: true
  plusOneHide: true


getOptions plus_one_options, (options) ->

  # Holds list of participants who +1'd the issue.
  participants = {}


  # returns true if node is IMG element with "thumbs up" emoji
  isThumbsUpImg = (node) ->
    result = false

    if node?.tagName is 'IMG'
      if node.getAttribute('class') is 'emoji'
        if node.getAttribute('alt') is ':+1:'
          result = true

    result


  # Returns true if content starts with "+1", excluding whitespace.
  startsWithPlusOne = (element) ->
    result = false

    # textual content
    content = element.textContent
    result = true if /^\s*\+1/.test element.textContent

    # thumbs up
    if options.plusOneThumbsUp
      result = true if isThumbsUpImg element.querySelector('p').firstChild

    result


  # Returns true if content only contains "+1".
  onlyContains = (element) ->
    result = false

    # Some people add dot or exclamation mark after it (e.g. "+1!"), so we also
    # return true if content contains "+1" and one more character.
    content = element.textContent
    /^\s*\+1.{0,1}\s*$/.test content

    # thumbs up
    if options.plusOneThumbsUp
      paragraphs = element.querySelectorAll 'p'
      if paragraphs.length is 1
        children = paragraphs[0].childNodes
        contains_no_text = /^\s*$/.exec paragraphs[0].textContent
        if contains_no_text and isThumbsUpImg children[0]
          result = true

    result


  # Retrieves info about person from the comment node. This is later used to
  # construct list of people who +1'd the issue.
  getParticipantInfo = (node) ->
    # first link in comment node contains avatar icon and user info
    link = node.querySelector 'a'
    avatar = link.querySelector 'img'

    {
      id: avatar.dataset.user
      url: link.href
      name: avatar.alt
    }


  # Constructs HTML code for user icon.
  getUserIcon = (user = {}) ->
    icon = createElement 'img', {
      alt: user.name
      width: '20'
      height: '20'
      class: 'avatar'
      src: "https://avatars0.githubusercontent.com/u/#{user.id}?v=2&s=40"
    }

    link = createElement 'a', {
      href: user.url
      class: 'participant-avatar'
    }

    link.appendChild icon

    link


  # Loop for walking through comment nodes and getting data about +1 votes.
  for element in document.querySelectorAll '.timeline-comment-wrapper'

    content_element = element.querySelector('.comment-body')

    if startsWithPlusOne content_element
      participant = getParticipantInfo element
      participants[participant.id] = participant

    if onlyContains content_element
      element.classList.add 'plus-one-comment'


  # If there are any +1 votes, display summary in the sidebar.
  if options.plusOneShowSummary

    plus_one_count = Object.keys(participants).length
    if plus_one_count > 0

      # Add list of people who +1'd this issue to the sidebar.
      sidebar_content = document.createDocumentFragment()
      for id, participant of participants
        sidebar_content.appendChild getUserIcon participant

      addSidebarItem(
        "+1 (#{plus_one_count}×)"
        sidebar_content
        'participation'
        'participation-avatars'
      )
