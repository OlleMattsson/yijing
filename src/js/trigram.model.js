define([
	'backbone'
], function(Backbone){
	
	var Trigram = Backbone.Model.extend({
		defaults: {
			name : "",
			lines : [0,0,0]
		}
	}) 

	return new Trigram()

})