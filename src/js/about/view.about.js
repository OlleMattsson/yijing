define([
'backbone',
'handlebars',
'HexagramCollection',
'HexagramView',
'text!templates/about.html'
], function(Backbone, Handlebars, HexagramCollection, HexagramView, templateHTML){
	var model = Backbone.Model.extend({
			// for translation
			defaults : {
				title : "About this work",
				mainContent : ''
				}	
			}
		);
	var view = Backbone.View.extend({
		template: Handlebars.compile( templateHTML ),
		model: new model(),
		tagName: 'HexagramList',
		el: "#mainView",

		render : function() {
			this.$el.html( this.template( this.model.toJSON()) );
		}
	});
	return new view();
});