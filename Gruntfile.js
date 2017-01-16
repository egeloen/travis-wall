module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        express: {
            app: {
                options: {
                    script: 'server.js'
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'bower_components',
                    copy: false,
                    cleanTargetDir: true
                }
            }
        },
        copy: {
            app: {
                files: [
                    {
                        src: 'public/favicon.ico',
                        dest: 'dist/favicon.ico'
                    },
                    {
                        src: 'public/index.html',
                        dest: 'build/index.html'
                    }
                ]
            },
            e2e: {
                files: [
                    {
                        src: 'bower_components/angular-mocks/angular-mocks.js',
                        dest: 'dist/js/angular-mocks.js'
                    },
                    {
                        src: 'public/index.html',
                        dest: 'build/index.html'
                    }
                ]
            }
        },
        processhtml: {
            app: {
                files: {
                    'dist/index.html': 'build/index.html'
                }
            },
            e2e: {
                files: {
                    'dist/index.html': 'build/index.html'
                }
            }
        },
        htmlmin: {
            app: {
                options: {
                    useShortDoctype: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeComments: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: {
                    'dist/index.html': 'dist/index.html',
                    'dist/partials/home.html': 'lib/partials/home.html',
                    'dist/partials/travis-login.html': 'lib/partials/travis-login.html',
                    'dist/partials/wall.html': 'lib/partials/wall.html'
                }
            }
        },
        less: {
            app: {
                files: {
                    'build/app.css': 'less/app.less'
                }
            }
        },
        imageEmbed: {
            app: {
                src: [ 'build/app.css' ],
                dest: 'build/app.css'
            }
        },
        cssmin : {
            options: {
                keepSpecialComments: 0
            },
            app: {
                src: 'build/app.css',
                dest: 'dist/css/app.min.css'
            }
        },
        ngAnnotate: {
            app: {
                src: [ 'lib/**/*.js' ],
                dest: 'build/main.js'
            }
        },
        concat: {
            app: {
                src: [
                    'bower_components/ev-emitter/ev-emitter.js',
                    'bower_components/eventEmitter/EventEmitter.js',
                    'bower_components/eventie/eventie.js',

                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/momentjs/min/moment-with-locales.js',
                    'bower_components/spin.js/spin.js',

                    'bower_components/angular/angular.js',
                    'bower_components/angular-masonry/angular-masonry.js',
                    'bower_components/angular-moment/angular-moment.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-spinner/angular-spinner.js',

                    'bower_components/desandro-matches-selector/matches-selector.js',
                    'bower_components/fizzy-ui-utils/utils.js',
                    'bower_components/get-size/get-size.js',
                    'bower_components/imagesloaded/imagesloaded.js',
                    'bower_components/outlayer/item.js',
                    'bower_components/outlayer/outlayer.js',
                    'bower_components/masonry/dist/masonry.pkgd.js',

                    'build/main.js'
                ],
                dest: 'build/app.js'
            }
        },
        uglify: {
            app: {
                files: {
                    'dist/js/app.min.js': 'build/app.js'
                }
            }
        },
        clean: {
            dist: [ 'dist' ],
            build: [ 'build' ]
        },
        watch: {
            img: {
                files:  [ 'img/**/*' ],
                tasks:  [ 'build' ]
            },
            less: {
                files:  [ 'less/**/*' ],
                tasks:  [ 'build' ]
            },
            lib: {
                files:  [ 'lib/**/*' ],
                tasks:  [ 'build' ]
            },
            public: {
                files: [ 'public/**/*' ],
                tasks: [ 'build' ]
            }
        },
        jshint: {
            files: [
                'lib/**/*.js',
                'test/**/*.js',
                '*.js'
            ]
        },
        jasmine: {
            app: {
                src: 'dist/js/app.min.js',
                options: {
                    specs: 'test/**/*Spec.js'
                }
            }
        },
        shell: {
            webDriverManagerUpdate: {
                command: 'node_modules/protractor/bin/webdriver-manager update'
            }
        },
        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js'
                }
            }
        },
        protractor: {
            e2e: {
                options: {
                    configFile: 'protractor.conf.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-image-embed');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('install', [ 'bower:install' ]);

    grunt.registerTask('build', [
        'clean:build',
        'clean:dist',
        'copy:app',
        'less:app',
        'imageEmbed:app',
        'ngAnnotate:app',
        'concat:app',
        'processhtml:app',
        'htmlmin:app',
        'cssmin:app',
        'uglify:app',
        'clean:build'
    ]);

    grunt.registerTask('dist', [
        'install',
        'build'
    ]);

    grunt.registerTask('serve', [
        'express:app',
        'watch'
    ]);

    grunt.registerTask('dev', [
        'dist',
        'serve'
    ]);

    grunt.registerTask('test:unit', [
        'copy:app',
        'processhtml:app',
        'htmlmin:app',
        'clean:build',
        'jshint',
        'karma:unit'
    ]);

    grunt.registerTask('test:e2e', [
        'copy:e2e',
        'processhtml:e2e',
        'htmlmin:app',
        'clean:build',
        'shell:webDriverManagerUpdate',
        'express:app',
        'protractor:e2e'
    ]);

    grunt.registerTask('test', [
        'test:unit',
        'test:e2e'
    ]);

    grunt.registerTask('travis', [
        'dist',
        'test'
    ]);
};
