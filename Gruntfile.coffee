module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    coffeelint:
      app: ['src/coffee/**/*.coffee']

    coffee:
      default:
        options:
          join: true
        files:
          # Firefox
          'extension/firefox/index.js' : [
            'src/coffee/firefox/index.coffee'
          ]
          'extension/firefox/data/content.js' : [
            'src/coffee/general/utilities.coffee'
            'src/coffee/firefox/utilities.coffee'
            'src/coffee/firefox/content.coffee'
            'src/coffee/general/add-sidebar-item.coffee'
            'src/coffee/general/hide-features.coffee'
            'src/coffee/general/plus-one.coffee'
            'src/coffee/general/emoji.coffee'
          ]
          'extension/firefox/data/settings.js' : [
            'src/coffee/firefox/settings.coffee'
            'src/coffee/general/settings.coffee'
          ]
          # Chrome
          'extension/chrome/background.js' : [
            'src/coffee/chrome/background.coffee'
          ]
          'extension/chrome/content.js' : [
            'src/coffee/general/utilities.coffee'
            'src/coffee/chrome/utilities.coffee'
            'src/coffee/chrome/content.coffee'
            'src/coffee/general/add-sidebar-item.coffee'
            'src/coffee/general/hide-features.coffee'
            'src/coffee/general/emoji.coffee'
            'src/coffee/general/plus-one.coffee'
          ]
          'extension/chrome/options.js' : [
            'src/coffee/general/utilities.coffee'
            'src/coffee/chrome/utilities.coffee'
            'src/coffee/chrome/options.coffee'
            'src/coffee/general/options.coffee'
          ]
          'extension/chrome/settings.js' : [
            'src/coffee/chrome/settings.coffee'
            'src/coffee/general/settings.coffee'
          ]
      test:
        files:
          'extension/firefox/test/test-index.js': [
            'test/firefox/index.spec.coffee'
          ]

    watch:
      options:
        atBegin: true
      default:
        files: ['src/coffee/**/*.coffee']
        tasks: ['dev']
      less:
        files: ['src/less/**/*.less']
        tasks: ['less']
      jade:
        files: ['src/jade/**/*.jade']
        tasks: ['jade']
      icons:
        files: ['src/img/icon.png']
        tasks: ['responsive_images']
      test:
        files: ['test/**/*.coffee']
        tasks: ['coffee:test']


    compress:
      chrome:
        options:
          archive: 'build/chrome/<%= pkg.name %>.zip'
        expand: true
        cwd: 'extension/chrome/'
        src: ['**/*']

    bump:
      options:
        files: [
          'package.json'
          'extension/chrome/manifest.json'
          'extension/firefox/package.json'
        ]
        updateConfigs: ['pkg']
        commitFiles: ['-a']
        pushTo: 'origin'

    responsive_images:
      chrome:
        options:
          sizes: [
            {width: 16}
            {width: 48}
            {width: 128}
          ]
        files:
          'extension/chrome/img/icon.png': 'src/img/icon.png'
      firefox:
        options:
          sizes: [
            {width: 48}
            {width: 64}
          ]
        files:
          'extension/firefox/img/icon.png': 'src/img/icon.png'

    less:
      default:
        files:
          'extension/chrome/content.css': 'src/less/content.less'
          'extension/chrome/options.css': 'src/less/options.less'
          'extension/firefox/data/content.css': 'src/less/content.less'

    jade:
      default:
        files:
          'extension/chrome/options.html': 'src/jade/options.jade'

    changelog:
      options: {}

    jpm:
      options:
        src: 'extension/firefox'
        xpi: 'build/firefox'


  require('load-grunt-tasks') grunt

  grunt.registerTask 'default', [
    'watch'
  ]

  grunt.registerTask 'dev', [
    'coffeelint'
    'coffee'
    'less'
    'jade'
  ]


  # Constructs the code, runs tests and if everyting is OK, creates a minified
  # version ready for production. This task is intended to be run manually.
  grunt.registerTask 'build', 'Bumps version and builds JS.', (version_type) ->
    version_type = 'patch' unless version_type in ['patch', 'minor', 'major']
    grunt.task.run [
      "bump-only:#{version_type}"
      'dev'
      'jpm:xpi'
      'compress'
      'changelog'
      'bump-commit'
    ]
