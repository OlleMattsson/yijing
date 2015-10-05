	define([
'backbone',
'handlebars',
'HexagramModel',
'text!templates/hexagram.html',
], function(Backbone, Handlebars, HexagramModel, templateHTML, HexagramData ){

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

			model.listenTo(model.get("aboveTri"), "change", function(sourceModel, context){
				model.set({"abovehtml" : sourceModel.get("html") })				
				model.set({"abovename" : sourceModel.get("name") })
				model.set({"abovenature" : sourceModel.get("nature") })
				model.set({"abovepersonality" : sourceModel.get("personality") })
			});
			
			model.listenTo(model.get("belowTri"), "change", function(sourceModel, context){
				model.set({"belowhtml" : sourceModel.get("html") })				
				model.set({"belowname" : sourceModel.get("name") })
				model.set({"belownature" : sourceModel.get("nature") })
				model.set({"belowpersonality" : sourceModel.get("personality") })
			});


			this.$el.html( this.template( model.toJSON() ) );
			return this;
		}

	});

	return view;

});