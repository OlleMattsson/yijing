define([
'backbone',
'handlebars',
'HexagramCollection',
'HexagramView',
'text!templates/about.html'
], function(Backbone, Handlebars, HexagramCollection, HexagramView, templateHTML){
	var model = Backbone.Model.extend({
			// for translation
			defaults : {
				title : "About this work",
				mainContent : 'The world deserves a better YiJing.<br><br>The QuJing is a modern implementation of the classical work, originally concieved some 5600 years ago.<br><br>With the QiJing I wanted to correct an aspect which is findamentally flawed in typical Yi Jing divination applications (both analogue and digital). Namely, the usage of the three coins to create "random" events applicable for divination. Traditionally, a the so called yarrow stalk model was used to create the random source. This method produces significantly different distributions of ying and yang lines in the hexagrams. The QuJing implementation tries to correct this by using the four coin model which produces similar distributions as the yarrow stalk method. <br><br>The flaw with the three coin model is that it\'s outcomes are far from "random". The QuJing attempts a dfferent approach, namely using quantum randomness as it\'s source of randomness. This approach more closely assembles the original spirit of cleromancic divination; the deep powers of so called "random" events. Most phenomena are classical and although chaotic, inherently deterministic and predictable. Quantum randmoness is the only true source of natural unpredictability that we, human kind, are aware of anno 2015. <br><br>I feel deeply that this source of unpredictable outcomes is the source of power of the YiJing.'
				}	
			}
		);
	var view = Backbone.View.extend({
		template: Handlebars.compile( templateHTML ),
		model: new model(),
		tagName: 'HexagramList',
		el: "#mainView",

		render : function() {
			this.$el.html( this.template( this.model.toJSON()) );
		}
	});
	return new view();
});