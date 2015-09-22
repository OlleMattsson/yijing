// define dependenies
require.config({
	waitSeconds: 10,
	paths: {


		
		inputField : 'js/inputField',
		inputFieldBind : 'js/inputField-bind',
		iChing : 'js/view.hexagramList',
		ModelBinder : 'bower_components/Backbone.ModelBinder/Backbone.ModelBinder.min',
		HexagramModel : 'js/model.hexagram',
		HexagramCollection : 'js/collection.hexagrams',
		HexagramView : 'js/view.hexagram',

		//Trigram : 'js/trigram.model',

		// libs
		backbone : 'bower_components/backbone/backbone-min',
		underscore : 'bower_components/underscore/underscore',
		handlebars : 'bower_components/handlebars/handlebars.min',
		jquery : 'bower_components/jquery/dist/jquery.min',
		text : 'bower_components/text/text',

		// entrypoint
		app: 'js/app',
		router : 'js/router',	
		DivinationModel : 'js/divination.model',
		DivinationView : 'js/divination.view'		
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