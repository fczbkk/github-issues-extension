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
            'src/coffee/general/utilities.coffee'
            'src/coffee/firefox/index.coffee'
          ]
          'extension/firefox/data/content.js' : [
            'src/coffee/general/add-sidebar-item.coffee'
            'src/coffee/general/hide-features.coffee'
            'src/coffee/general/plus-one.coffee'
            'src/coffee/firefox/content.coffee'
          ]
          # Chrome
          'extension/chrome/background.js' : [
            'src/coffee/general/utilities.coffee'
            'src/coffee/chrome/background.coffee'
          ]
          'extension/chrome/content.js' : [
            'src/coffee/general/add-sidebar-item.coffee'
            'src/coffee/general/hide-features.coffee'
            'src/coffee/general/plus-one.coffee'
            'src/coffee/chrome/content.coffee'
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
      icons:
        files: ['src/img/icon.png']
        tasks: ['responsive_images']
      test:
        files: ['test/**/*.coffee']
        tasks: ['coffee:test']


    'mozilla-addon-sdk':
      '1_15':
        options:
          revision: '1.15'
      master:
        options:
          revision: 'master'
          github: true

    'mozilla-cfx-xpi':
      stable:
        options:
          'mozilla-addon-sdk': '1_15'
          extension_dir: 'extension/firefox'
          dist_dir: 'build/firefox/stable'
      experimental:
        options:
          'mozilla-addon-sdk': 'master'
          extension_dir: 'extension/firefox'
          dist_dir: 'build/firefox/experimental'

    'mozilla-cfx':
      run_stable:
        options:
          'mozilla-addon-sdk': '1_15'
          extension_dir: 'extension/firefox'
          command: 'run'
      run_experimental:
        options:
          'mozilla-addon-sdk': 'master'
          extension_dir: 'extension/firefox'
          command: 'run'

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
          'extension/firefox/data/content.css': 'src/less/content.less'

  require('load-grunt-tasks') grunt

  grunt.registerTask 'default', [
    'watch'
  ]

  grunt.registerTask 'dev', [
    'coffeelint'
    'coffee'
  ]

  grunt.registerTask 'build', (target = 'patch') ->
    grunt.task.run [
      'dev'
      "bump:#{target}"
      # 'mozilla-cfx-xpi'
      'compress'
    ]
