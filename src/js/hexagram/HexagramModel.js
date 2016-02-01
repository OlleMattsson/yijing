define([
  'backbone', 
], function(Backbone) {	
	var Hexagram =	Backbone.Model.extend({
			initialize : function(yjData) {		
				for (var label in yjData) {
					this.set(label, yjData[label])
				}
				this.set('id', this.get('kingwen'))	
			}		
		});
	return Hexagram;	
});