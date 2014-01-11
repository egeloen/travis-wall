module.exports = function(config) {
    config.set({
        frameworks: [ 'jasmine' ],
        browsers: [ 'PhantomJS' ],
        files: [
            'dist/**/*.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'test/**/*.js'
        ],
        reporters: [ 'dots' ],
        port: 9876,
        autoWatch: false,
        singleRun: true
    });
};
