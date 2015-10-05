define([
'backbone',
'handlebars',
'js/trigram/collection',
'js/trigram/view',
'text!templates/trigram.html'
], function(Backbone, Handlebars, TrigramCollection, TrigramView, templateHTML){
	
	var viewModel = Backbone.Model.extend({
			defaults : {
				name : "List of Hexagrams"}	
			}
		);

	var view = Backbone.View.extend({
		template: '<div id="trigramList" class="list"></div>',
		model: new viewModel(),
		tagName: 'bagua',
		el: "#mainView",
		initialize : function (selector) {
			/*
			this.collection.bind("reset", this.render, this);
        	this.collection.bind("change", this.render, this);
        	this.collection.on("onComplete", this.render, this); // in case we hate using fetch({reset:true})
			*/
		},
		render : function() {
			this.$el.html( this.template);
			
			this.collection.each(function(instance){				
				var view = new TrigramView({ model: instance });
				var html = view.render().el; // for clarity's sake
				this.$el.find('#trigramList').append( html ); // bleh.. append to the <ul> element inside <hexagramList> 
			}, this);

			console.log( this.collection.models )	

			return this;
		},
		renderOne : function(which, where) {
			var collection = this.collection;
			

			var view = new TrigramView({ model: collection.get(which) });
			var html = view.render().el; // for clarity's sake
			this.$el.find( where ).append( html ); // bleh.. append to the <ul> element inside <hexagramList> 
		}
	});
	return view;
});