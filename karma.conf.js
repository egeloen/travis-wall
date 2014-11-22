module.exports = function(config) {
    'use strict';

    config.set({
        files: [
            'dist/**/*.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'test/unit/**/*Spec.js'
        ],
        plugins: [ 'karma-jasmine', 'karma-phantomjs-launcher' ],
        frameworks: [ 'jasmine' ],
        browsers: [ 'PhantomJS' ],
        reporters: [ 'dots' ],
        autoWatch: false,
        singleRun: true
    });
};
