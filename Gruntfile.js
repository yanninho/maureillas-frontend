// Generated on 2015-02-03 using generator-angular 0.11.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var context = grunt.option('context') || '';

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    VIEWS: require('./config.json').VIEWS,
    FEEDS: require('./config.json').FEEDS,
    REMOTE: require('./config.json').REMOTE,
    URLS: require('./config.json').URLS,
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      preprocess: {
        files: ['templates/**.*'],
        tasks: ['preprocess']
      },
      js: {
        files: ['<%= yeoman.app %>/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35749
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9002,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/application',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    // svg : [/<md-icon[^\>]*[^\>\S]+md-svg-icon=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with non standard md-svg-icon attribute on md-icon"']
    usemin: {
      html: ['<%= yeoman.dist %>/*.html', '<%= yeoman.dist %>/**/*.html'],
      htmlalternative: ['<%= yeoman.dist %>/*.html','<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'], 
      options: {
        patterns: {
          htmlalternative: [
            [/<img[^\>]*[^\>\S]+ng-src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with non standard ng-src attribute on img']
          ]
        },
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }
        ]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '**/*.html',
            '**/i18n/*.json',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*',
            'init-*.js'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
           expand: true,
          dot: true,
          cwd: 'LaunchIcons',
          dest: '<%= yeoman.dist %>/LaunchIcons',
          src: [
            '**/*.png',
            '**/*.jpeg',
            '**/*.jpg',
            '**/*.gif'
          ]         
        }, {
           expand: true,
          dot: true,
          cwd: 'splashScreens',
          dest: '<%= yeoman.dist %>/splashScreens',
          src: [
            '**/*.png',
            '**/*.jpeg',
            '**/*.jpg',
            '**/*.gif'
          ]         
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },
    ngconstant: {
      options: {
        deps: false
      },
      development: {
        options: {
        name: 'maureillasApp.common',
        dest: '<%= yeoman.app %>/modules/common/services/config.service.js'
        },
        constants: {
          VIEWS: '<%= yeoman.VIEWS %>',
          FEEDS: '<%= yeoman.FEEDS %>',
          REMOTE: '<%= yeoman.REMOTE %>',
          URLS: '<%= yeoman.URLS.DEVELOPMENT %>'
        }
      },
      test: {
        options: {
          name: 'maureillasApp.common',
          dest: '<%= yeoman.app %>/modules/common/services/config.service.js',
        },
        constants: {
          VIEWS: '<%= yeoman.VIEWS %>',
          FEEDS: '<%= yeoman.FEEDS %>',
          REMOTE: '<%= yeoman.REMOTE %>',
          URLS: '<%= yeoman.URLS.TEST %>'
        }
      },
      production: {
        options: {
          name: 'maureillasApp.common',
          dest: '<%= yeoman.app %>/modules/common/services/config.service.js',
        },
        constants: {
          VIEWS: '<%= yeoman.VIEWS %>',
          FEEDS: '<%= yeoman.FEEDS %>',
          REMOTE: '<%= yeoman.REMOTE %>',
          URLS: '<%= yeoman.URLS.PRODUCTION %>'
        }
      }
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },
    replace: {
      image_path: {
        src: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
        overwrite: true,                 // overwrite matched source files
        replacements: [{
          from: /url\(\/images/g,
          to: 'url(/' + context + '/images'
        }]
      }
    },
    preprocess : {
      options: {
        context : {
          DEBUG: true
        }
      },
      html : {
        src : 'templates/index.template.html',
        dest : 'app/index.html'
      },
      js : {
        src : 'templates/app.template.js',
        dest : 'app/app.js'
      }
    },    
    env : {
        options : {
        },
        dev: {
            NODE_ENV : 'DEVELOPMENT'
        },
        prod : {
            NODE_ENV : 'PRODUCTION'
        }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'env:dev',
      'preprocess',
      'ngconstant:development',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'ngconstant:development',
    'karma'
  ]);

  grunt.registerTask('build', function (target) {
    if (target === 'DEVELOPMENT') {
      grunt.log.ok('Construction de l\'application pour l\'environnement de Dévelopement');
      return grunt.task.run(['ngconstant:development', 'buildAll']);
    }
    if (target === 'PRODUCTION') {
      grunt.log.ok('Construction de l\'application pour l\'environnement de Production');
      return grunt.task.run(['ngconstant:production', 'buildAll']);
    }
   if (target === 'TEST') {
       grunt.log.ok('Construction de l\'application pour l\'environnement de Test');
      return grunt.task.run(['ngconstant:test', 'buildAll']);
    }
    grunt.log.warn('Vous devez spécifier un argument pour cette tache : grunt build:env avec env = DEVELOPMENT, PRODUCTION ou TEST');
  });

  grunt.registerTask('buildAll', [
      'clean:dist',
      'env:prod',
      'preprocess',
      'wiredep',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'cdnify',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'htmlmin',
      'replace'
  ]);


  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
