define([
'backbone',
'handlebars',
'HexagramModel',
'text!templates/hexagram.html',
'text!static/iching/1.html',
], function(Backbone, Handlebars, HexagramModel, templateHTML, HexagramData ){

	var view = Backbone.View.extend({
		el : '#hexagram',
		template: Handlebars.compile( templateHTML ),
		tagName: 'div', 
		
		initialize : function () {
		},
		
		render : function() {
			var model = this.model;

			// replace any instance of \n with <br> in the model, 
			// we use {{{}}} in our template to render the html
			_.each(this.model.attributes, function(value, key, items){
				if (typeof value === 'string') {
					model.set(key, value.replace(/\n/g, "<br/>"))
				}
			});

			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}

	});

	return view;

});