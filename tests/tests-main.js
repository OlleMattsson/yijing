var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(file);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/websrc',
  paths: {
    async: 'bower_components/async/dist/async',
    backbone : 'bower_components/backbone/backbone',
    foundation: 'bower_components/foundation/js/foundation',
    handlebars: 'bower_components/handlebars/handlebars.min',
    json: 'bower_components/requirejs-json/json',
    jquery: 'bower_components/jquery/dist/jquery',
    lscache: 'bower_components/lscache/lscache',
    settings: 'script/settings',
    text: 'bower_components/requirejs-text/text',
    underscore: 'bower_components/underscore/underscore'
  },
  shim: {

  },
  deps: allTestFiles,
  callback: function(){
    window.__karma__.start();
  }
});