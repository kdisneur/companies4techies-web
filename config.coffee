exports.config =
  modules:
    definition: false
    wrapper: false
  plugins:
    sass:
      options: [
        '--load-path', './bower_components'
      ]
    afterBrunch: [
      'cp -r bower_components/font-awesome/fonts public/.'
    ]
  files:
    javascripts:
      joinTo:
        'javascripts/app.js':    /^app\/javascripts/
        'javascripts/vendor.js': /^(bower_components|vendor\/javascripts)/
      order:
        before: [
          'bower_components/modernizr/modernizr.js'
          'bower_components/jquery/jquery.js'
          'bower_components/jquery-smooth-scrolling/jquery.smoothscroll.js'
          'bower_components/jquery-waypoints/waypoints.js'
          'app/javascripts/controllers/*.js'
          'app/javascripts/services/*.js'
          'app/javascripts/app.js'
        ]
    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
