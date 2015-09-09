define([
  'backbone', 
  'HexagramModel'
], function(Backbone, HexagramModel) {
	
		var collection = Backbone.Collection.extend({
			model : HexagramModel, // important: should be a MODEL, not an INSTANCE of a model 
			url : "js/iching.json",
			
			initialize : function() {				
				var self = this;
				this.fetch({
					dataType: 'json', 	// very important!
				    reset: true,		// triggers "reset" event when fetch is done
					error : function(col, res) { console.log("HexagramCollection fetch() ERROR:", col, res)},
					success : function(col, res) { },
					complete : function(xhr, text) {						
						// we could use a custom event to trigger render() in the view
						// self.trigger('onComplete') 	
					}
				});
			}
		});

		return collection;	
});