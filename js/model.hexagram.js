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
				mandarinName : "",		// romanized mandarin
				mandarinCharacter : '',	// mandarin utf-8 character
				description : "", 		// text
				upperTrigram : '',		// new Trigram()
				lowerTrigram : '', 		// new Trigram()
				judgement : '', 		// text
				image : '',
				lines : { line1 : '',	// text fields
						  line2 : '',
						  line3 : '',
						  line4 : '',
						  line5 : '',
						  line6 : '',	}
			}
		});
	return Hexagram;	
});