// define dependenies
require.config({
	paths: {
		backbone : 'bower_components/backbone/backbone-min',
		underscore : 'bower_components/underscore/underscore',
		handlebars : 'bower_components/handlebars/handlebars.min',
		jquery : 'bower_components/jquery/dist/jquery.min',
		text : 'bower_components/text/text',
		app: 'js/app',
		router : 'js/router',
		inputField : 'js/inputField',
		inputFieldBind : 'js/inputField-bind',
		iChing : 'js/view.hexagramList',
		ModelBinder : 'bower_components/Backbone.ModelBinder/Backbone.ModelBinder.min',
		HexagramModel : 'js/model.hexagram',
		HexagramView : 'js/view.hexagram',
		HexagramCollection : 'js/collection.hexagrams'
	},
	// shimming for all non AMD modules
	shim : {
		'backbone' : {
			deps : ['underscore', 'jquery'],
			exports : 'Backbone'
		},
		'underscore' : {
			exports : '_'
		},
		'handlebars' : {
			deps : ['jquery'],
			exports : 'Handlebars'
		}
	}
});

// Start the application 
require(['app'], function(App){
	App.start();
});