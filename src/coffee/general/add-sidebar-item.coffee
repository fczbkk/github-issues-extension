addSidebarItem = (
  title = ''
  content = null
  wrapper_class = ''
  content_class = ''
) ->
  element = createElement 'div', {
    class: 'discussion-sidebar-item sidebar-plusone'
  }

  wrapper_element = createElement(
    'div'
    {class: wrapper_class}
  )

  title_element = createElement(
    'h3'
    {class: 'discussion-sidebar-heading'}
    title
  )

  content_element = createElement(
    'div'
    {class: content_class}
  )

  content_element.appendChild content
  wrapper_element.appendChild title_element
  wrapper_element.appendChild content_element
  element.appendChild wrapper_element

  sidebar_element = document.querySelector '.discussion-sidebar'
  sidebar_element.appendChild element
