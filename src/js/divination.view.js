define([
	'backbone',
	'handlebars',
	'ModelBinder',
	'DivinationModel',
	'text!templates/divination.html'
	], 
	function(Backbone, Handlebars, ModelBinder, DivinationModel, Template){
		var view = Backbone.View.extend({
			el : '#mainView',
			model : DivinationModel,
			template: Handlebars.compile( Template ),
			modelBinder: new Backbone.ModelBinder(),  	

			render: function() {
				this.$el.html( this.template );

				var bindings = { 
					"kingWenNow" : [{
				        selector: '[name = "kingWenNow"]',
				        elAttribute: "href",
				        converter: this.hexagramLinkConverter
				    },
				    {
				        selector: '[name = "kingWenNow"]'
				    }],
					"kingWenFuture" : [{
				        selector: '[name = "kingWenFuture"]',
				        elAttribute: "href",
				        converter: this.hexagramLinkConverter
				    },
				    {
				        selector: '[name = "kingWenFuture"]'
				    }],

				 };
				this.modelBinder.bind(this.model, this.el, bindings);
			},

			hexagramLinkConverter : function (direction, value) {
				var baseURL = '#browser/'
			    if (direction === "ModelToView") {
			        //format only when the direction is from model to view
			        return  baseURL + value;
			    } else {
			        //from view to model, just store the plain value
			        return value;
			    }
	    	},

			renderLine : function(line, sequence, renderTarget) {
				var monogram = '', sequence;
				switch (sequence[line]) {
					
					// --x--
					case 0:
						monogram = '<span class="monogram old">&#9867;</span>'
						break;						

					// --0--
					case 1: case 2: case 3:
						monogram = '<span class="monogram old">&#9866;</span>'
						break;		

					// -----
					case 4:	case 5: case 6:	case 7:	case 8: 
						monogram = '<span class="monogram">&#9866;</span>';				
						break;

					// -- --		
					case 9:	case 10: case 11: case 12: case 13: case 14: case 15: 
						monogram = '<span class="monogram">&#9867;</span>';	
						break; 						
				}					

				this.$el.find('#'+ renderTarget + "Line-" + (line + 1)).html(monogram);
			},

			renderHexagram : function() {				
				for (var i = 0, l = this.model.nowSequence.length; i < l; i++ ) {
					this.renderLine(i, this.model.nowSequence, 'hexagram');
				}
			},
			
			renderFutureHexagram : function() {
				for (var i = 0, l = this.model.futureSequence.length; i < l; i++ ) {
					this.renderLine(i, this.model.futureSequence, 'futureHexagram');
				}
			}			
		});

		return new view();
	}
); 