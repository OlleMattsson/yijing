define([
'backbone',
'handlebars',
'HexagramCollection',
'HexagramView',
'text!templates/hexagramList.html'
], function(Backbone, Handlebars, HexagramCollection, HexagramView, templateHTML){
	var viewModel = Backbone.Model.extend({
			defaults : {
				name : "List of Hexagrams"}	
			}
		);
	var view = Backbone.View.extend({
		template: Handlebars.compile( templateHTML ),
		model: new viewModel(),
		tagName: 'HexagramList',
		el: "#HexagramList",
		initialize : function (selector) {
			this.collection = new HexagramCollection();
			this.collection.bind("reset", this.render, this);
        	this.collection.bind("change", this.render, this);
        	this.collection.on("onComplete", this.render, this); // in case we hate using fetch({reset:true})
         	$(selector).append(this.el);
		},
		render : function() {
			this.$el.html( this.template( this.model.toJSON()) );
			this.collection.each(function(instance){
				var view = new HexagramView({ model: instance });
				var html = view.render().el; // for clarity's sake
				this.$el.find('ul').append( html ); // bleh.. append to the <ul> element inside <hexagramList> 
			}, this);
		}
	});
	return view;
});