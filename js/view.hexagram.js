define([
'backbone',
'handlebars',
'HexagramModel',
'text!templates/hexagram.html'
], function(Backbone, Handlebars, HexagramModel, templateHTML ){
	var view = Backbone.View.extend({
		template: Handlebars.compile( templateHTML ),
		model: new HexagramModel(),
		tagName: 'li', // because we append it to <ul>... mjeh
		
		initialize : function () {
			// this.render(); // not needed since rener returns this
		},
		
		render : function() {
			this.$el.html( this.template( this.model.toJSON()) );
			return this; // so we can call view.render().el hexagram list view
		}

	});

	return view;

});