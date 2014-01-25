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
                        expand: true,
                        flatten: true,
                        src: [ 'public/*' ],
                        dest: 'dist/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [ 'public/img/*' ],
                        dest: 'dist/img/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [ 'lib/partials/*' ],
                        dest: 'dist/partials/'
                    }
                ]
            }
        },
        less: {
            app: {
                files: {
                    'build/app.css': 'less/app.less'
                }
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
        ngmin: {
            app: {
                src: [ 'lib/**/*.js' ],
                dest: 'build/app.js'
            }
        },
        uglify: {
            app: {
                files: {
                    'dist/js/app.min.js': [
                        'bower_components/jquery/jquery.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-route/angular-route.js',
                        'bower_components/angular-spinner/angular-spinner.js',
                        'bower_components/angular-masonry/angular-masonry.js',
                        'bower_components/spin.js/spin.js',
                        'bower_components/get-style-property/get-style-property.js',
                        'bower_components/get-size/get-size.js',
                        'bower_components/eventie/eventie.js',
                        'bower_components/doc-ready/doc-ready.js',
                        'bower_components/eventEmitter/EventEmitter.js',
                        'bower_components/jquery-bridget/jquery.bridget.js',
                        'bower_components/matches-selector/matches-selector.js',
                        'bower_components/imagesloaded/imagesloaded.js',
                        'bower_components/outlayer/item.js',
                        'bower_components/outlayer/outlayer.js',
                        'bower_components/masonry/masonry.js',
                        'bower_components/momentjs/min/moment-with-langs.js',
                        'build/app.js'
                    ]
                }
            }
        },
        clean: {
            dist: [ 'dist' ],
            build: [ 'build' ]
        },
        watch: {
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
                'Gruntfile.js'
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
        karma: {
            unit: {
                options: {
                   files: [
                        'dist/**/*.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'test/unit/**/*.js'
                    ],
                    frameworks: [ 'jasmine' ],
                    browsers: [ 'PhantomJS' ],
                    reporters: [ 'dots' ],
                    port: 9876,
                    autoWatch: false,
                    singleRun: true
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
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('install', [ 'bower:install' ]);
    grunt.registerTask('build', [ 'clean:dist', 'copy', 'less', 'cssmin', 'ngmin', 'uglify', 'clean:build' ]);
    grunt.registerTask('dist', [ 'install', 'build' ]);
    grunt.registerTask('serve', [ 'express:app', 'watch' ]);
    grunt.registerTask('test:unit', [ 'jshint', 'karma:unit' ]);
    grunt.registerTask('test:e2e', [ 'express:app', 'protractor:e2e' ]);
    grunt.registerTask('test', [ 'test:unit', 'test:e2e' ]);
    grunt.registerTask('travis', [ 'dist', 'test' ]);
};
