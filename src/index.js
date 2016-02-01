require.config({
	waitSeconds: 10,
	paths: {
		// vendor libs
		backbone : 'bower_components/backbone/backbone-min',
		underscore : 'bower_components/underscore/underscore',
		handlebars : 'bower_components/handlebars/handlebars.min',
		jquery : 'bower_components/jquery/dist/jquery.min',
		text : 'bower_components/text/text',
		bootstrap : 'bower_components/bootstrap/dist/js/boostrap.min',
		AutoCompleteView :'js/backbone.autocomplete',
		ModelBinder : 'bower_components/Backbone.ModelBinder/Backbone.ModelBinder.min',

		// app modules
		app: 'js/app/app',
		router : 'js/app/router',	
		DivinationModel : 'js/divination',
		DivinationView : 'js/divination.view',
		HexagramModel : 'js/hexagram/HexagramModel',
		HexagramCollection : 'js/hexagram/HexagramCollection',
		HexagramBrowser : 'js/hexagram/HexagramBrowser',
		About : 'js/about/view.about',
		//HexagramView : 'js/hexagram/HexagramView',	
		//iChing : 'js/hexagram/HexagramList',
		//Trigram : 'js/trigram.model',
		//inputField : 'js/inputField',
		//inputFieldBind : 'js/inputField-bind'
	},
	shim : {
		'underscore' : {
			exports : '_'
		},
		'handlebars' : {
			deps : ['jquery'],
			exports : 'Handlebars'
		},
		'bootstrap' : {
			exports : 'bootstrap'
		}
	}
});


require(['router'], function(Router){
	new Router();
	Backbone.history.start(); // {pushState: true}
});