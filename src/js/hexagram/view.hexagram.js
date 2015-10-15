define([
	'backbone',
	'handlebars',
	'HexagramModel',
	'text!templates/hexagram.html',
	'js/trigram/collection',
	'js/trigram/model'
], function(Backbone, Handlebars, HexagramModel, templateHTML, HexagramData, TrigramCollection, Trigram){

	var view = Backbone.View.extend({
		el : '#mainView',
		template: Handlebars.compile( templateHTML ),
		tagName: 'div', 

		render : function() {
			var model = this.model;
			// replace any instance of \n with <br> in the model, 
			// we use {{{}}} in our template to render the html
			_.each(model.attributes, function(value, key, items){
				if (typeof value === 'string') {
					model.set(key, value.replace(/\n/g, "<br/>"))
				}
			});

			this.$el.html( this.template( model.toJSON() ) );
			console.log( this )

			return this;
		},
		events : {
			"click" : function() {console.log(this)}
		}

	});

	return view;

});