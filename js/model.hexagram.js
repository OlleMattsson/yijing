define([
  'jquery',     
  'backbone', 
], function($, Backbone) {	
	var Hexagram =	Backbone.Model.extend({
			defaults: {
				id : 0,
				utf8 : "",
				html : "",
				sequence : [0,0,0,0,0,0],
				name : "",
				description : ""
			}
		});
	return Hexagram;	
});