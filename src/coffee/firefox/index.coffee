self = require 'sdk/self'
pageMod = require 'sdk/page-mod'

# e.g. 'https://github.com/fczbkk/github-issues-extension/issues/2'
include_pattern = ///
  # any protocol
  .*://
  # any subdomain at github.com
  (.*\.)*github\.com/
  # issues in any project under any user
  .*/issues/
  # issue detail
  .+
///

pageMod.PageMod
  include: include_pattern
  contentScriptFile: self.data.url 'content.js'
  contentStyleFile: self.data.url 'content.css'
