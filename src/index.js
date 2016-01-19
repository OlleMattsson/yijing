// define dependenies
require.config({
	waitSeconds: 10,
	paths: {
		// libs
		backbone : 'bower_components/backbone/backbone-min',
		underscore : 'bower_components/underscore/underscore',
		handlebars : 'bower_components/handlebars/handlebars.min',
		jquery : 'bower_components/jquery/dist/jquery.min',
		text : 'bower_components/text/text',
		bootstrap : 'bower_components/bootstrap/dist/js/boostrap.min',
		AutoCompleteView :'js/backbone.autocomplete',


		// app
		app: 'js/app/app',
		router : 'js/app/router',	

		DivinationModel : 'js/divination',
		DivinationView : 'js/divination.view',

		HexagramModel : 'js/hexagram/HexagramModel',
		HexagramCollection : 'js/hexagram/HexagramCollection',
		HexagramView : 'js/hexagram/HexagramView',	
		HexagramBrowser : 'js/hexagram/HexagramBrowser',
		iChing : 'js/hexagram/HexagramList',

				//Trigram : 'js/trigram.model',

		inputField : 'js/inputField',
		inputFieldBind : 'js/inputField-bind',
		ModelBinder : 'bower_components/Backbone.ModelBinder/Backbone.ModelBinder.min',
	},
	// shimming for all non AMD modules
	shim : {
		/*
		'backbone' : {
			deps : ['underscore', 'jquery'],
			exports : 'Backbone'
		},
		*/
		'underscore' : {
			exports : '_'
		},
		'handlebars' : {
			deps : ['jquery'],
			exports : 'Handlebars'
		},
		'bootstrap' : {
			exports : 'Backboneootstrap'
		}
	}
});

// Start the application 
require(['router'], function(Router){

	window.Yijing = {
		Models : {},
		Collection : {},
		Views : {}
	};

      new Router();
      Backbone.history.start(); // {pushState: true}
});