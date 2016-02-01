define([
  'backbone', 
  'HexagramModel'
], function(Backbone, HexagramModel) {
	
		var collection = Backbone.Collection.extend({
			model : HexagramModel, // important: should be a MODEL, not an INSTANCE of a model 
			ready : false
		});

		return collection;	
});