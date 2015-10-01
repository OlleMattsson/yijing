define([
  'jquery',     
  'backbone', 
], function($, Backbone) {	
	var Hexagram =	Backbone.Model.extend({
			url : '',		
			//urlRoot : 'static/iching',	
			parse : function(res) {
				return res[0];
			},
			initialize : function() {				
				var self = this;
				this.url = 'static/iching/' + this.id + '.json';
				this.fetch({
					dataType: 'json', 	// very important!
				    reset: true,		// triggers "reset" event when fetch is done
					error : function(model, res, options) { console.log("HexagramCollection fetch() ERROR:", model, res)},
					success : function(model, res, options) {
					 },
					complete : function(xhr, text) {
						// we could use a custom event to trigger render() in the view
						// self.trigger('onComplete') 	
					}
				});


			}
		});
	return Hexagram;	
});