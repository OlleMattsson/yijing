// Karma configuration
module.exports = function(config) {
  config.set({
    basePath : '',
    files : [
        // vendor libs
        {pattern: 'src/bower_components/backbone/backbone.js', included: false},
        {pattern: 'src/bower_components/jquery/dist/jquery.js', included: false},
        {pattern: 'src/bower_components/underscore/underscore.js', included: false},
        {pattern: 'src/bower_components/handlebars/handlebars.min.js', included: false},
        {pattern: 'src/bower_components/requirejs-text/text.js', included: false},
        {pattern: 'src/bower_components/foundation/js/foundation.js', included: false},
        {pattern: 'src/bower_components/lscache/lscache.js', included: false},
        {pattern: 'src/bower_components/async/dist/async.js', included: false},

        // connector code
        {pattern: 'src/models/**/*.js', included: false},
        {pattern: 'websrc/views/**/*.js', included: false},
        {pattern: 'websrc/script/*.js', included: false},
        {pattern: 'websrc/templates/**/*.html', included: false},

        // tests
        {pattern: 'tests/*.test.js', included: false},

        // test app entry point
        'tests/test-main.js'
    ],
    exclude: [
        'websrc/script/main.js'
    ],
    frameworks: ['jasmine', 'requirejs'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG, // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false,
    captureTimeout: 60000,              // default 6000
    browserDisconnectTimeout : 2000,    // default 2000
    browserDisconnectTolerance : 1,     // default 0
    browserNoActivityTimeout : 10000    // default 10000
  });
};