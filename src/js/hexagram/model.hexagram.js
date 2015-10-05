define([
  'jquery',     
  'backbone', 
  'js/trigram.model.js'
], function($, Backbone, Trigram) {	
	var Hexagram =	Backbone.Model.extend({
			url : '',		
			//urlRoot : 'static/iching',	
			aboveTri : null,
			belowTri : null,
			parse : function(res) {
				return res[0];
			},
			initialize : function() {				
				var model = this;
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

						model.set({ aboveTri : new Trigram({id : model.get("above") }) });
						model.set({ belowTri : new Trigram({id : model.get("below") }) });
					}
				});


			}
		});
	return Hexagram;	
});