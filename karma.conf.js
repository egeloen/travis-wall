module.exports = function(config) {
    'use strict';

    config.set({
        files: [
            'dist/**/*.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'test/unit/**/*Spec.js'
        ],
        frameworks: [ 'jasmine' ],
        browsers: [ 'PhantomJS' ],
        reporters: [ 'dots' ],
        autoWatch: false,
        singleRun: true
    });
};
