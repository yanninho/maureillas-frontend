// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-02-03 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/angular/angular.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/underscore/underscore.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-cache/dist/angular-cache.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      // fichiers de l'application : ordre important !!
      'test/spec/init-test-app.js',

      'app/modules/common/common.module.js',
      'app/modules/common/services/*.js',
      'app/modules/common/directives/*.js',

      'app/modules/feeds/feeds.module.js',
      'app/modules/feeds/services/*.js',
      'app/modules/feeds/directives/*.js',      

      'app/modules/main/main.module.js',
      'app/modules/main/services/*.js',
      'app/modules/main/directives/*.js',      

      'app/modules/push/push.module.js',
      'app/modules/push/services/*.js',
      'app/modules/push/directives/*.js',      

      'app/modules/server/server.module.js',
      'app/modules/server/*.js',     

      'app/app.js',
      //
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8081,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    //Code Coverage
    reporters: ['progress', 'coverage'],
    preprocessors: { 'app/**/*.js': ['coverage'] },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },    
    //    

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
