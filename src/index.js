// define dependenies
require.config({
	waitSeconds: 10,
	paths: {
		inputField : 'js/inputField',
		inputFieldBind : 'js/inputField-bind',
		iChing : 'js/view.hexagramList',
		ModelBinder : 'bower_components/Backbone.ModelBinder/Backbone.ModelBinder.min',


		//Trigram : 'js/trigram.model',

		// libs
		backbone : 'bower_components/backbone/backbone-min',
		underscore : 'bower_components/underscore/underscore',
		handlebars : 'bower_components/handlebars/handlebars.min',
		jquery : 'bower_components/jquery/dist/jquery.min',
		text : 'bower_components/text/text',
		bootstrap : 'bower_components/bootstrap/dist/js/boostrap.min',

		// entrypoint
		app: 'js/app/app',
		router : 'js/app/router',	
		DivinationModel : 'js/divination.model',
		DivinationView : 'js/divination.view',
		HexagramModel : 'js/hexagram/model.hexagram',
		HexagramCollection : 'js/collection.hexagrams',
		HexagramView : 'js/hexagram/view.hexagram',	

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
      new Router();
      Backbone.history.start(); // {pushState: true}
});