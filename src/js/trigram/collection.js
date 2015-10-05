define([
  'backbone', 
  'js/trigram/model'
], function(Backbone, Trigram) {
		var collection = Backbone.Collection.extend({
			//model : Trigram, // important: should be a MODEL, not an INSTANCE of a model 
			url : "js/trigram/data.json",	
			
			load : function() {				
				var collection = this;
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

				//this.bind("reset", this.dispatch, this);
	        	//this.bind("change", this.trigger, this);

	        	// quite redundant - we can as easily listen to the reset event itself =)
	        	collection.on("reset", function() {
	        		collection.trigger('trigramCollectionReady');	
	        	}, this);
			}
		});

		return new collection();	
});