addSidebarItem = (
  title = ''
  content = ''
  wrapper_class = ''
  content_class = ''
) ->
  sidebar_element = document.querySelector '.discussion-sidebar'
  element = document.createElement 'div'
  element.innerHTML = "
    <div class='discussion-sidebar-item sidebar-plusone'>
      <div class='#{wrapper_class}'>
        <h3 class='discussion-sidebar-heading'>#{title}</h3>
        <div class='#{content_class}'>#{content}</div>
      </div>
    </div>
  "
  sidebar_element.appendChild element
