define([
  'backbone', 
], function(Backbone) {	
	var Hexagram =	Backbone.Model.extend({
			initialize : function() {				
				// populate the Hexagram Model
				this.url = 'static/iching/' + this.id + '.json';
				this.fetch({
					dataType: 'json', 	// very important!
				    reset: true,		// triggers "reset" event when fetch is done
					error : function(model, res, options) { console.log("HexagramCollection fetch() ERROR:", model, res)},
				});
			},
			parse : function(res) {
				return res[0];
			}			
		});
	return Hexagram;	
});