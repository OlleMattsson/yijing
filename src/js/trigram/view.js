define([
			'backbone','handlebars', 'text!templates/trigram.html',
], function( Backbone,  Handlebars,   templateHTML){

	var TrigramView = Backbone.View.extend({
		template: Handlebars.compile( templateHTML ),
		tagName: 'div', 
		render : function(model, element) {
			$(element).append('<br>' +  this.template( model.toJSON() ) );
			return this;
		}
	});

	return new TrigramView();

});