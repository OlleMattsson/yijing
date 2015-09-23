define([
	'backbone',
	'handlebars',
	'ModelBinder',
	'DivinationModel',
	'text!templates/divination.html'
	], 
	function(Backbone, Handlebars, ModelBinder, DivinationModel, Template){
		var view = Backbone.View.extend({
			el : '#divine',
			model : DivinationModel,
			template: Handlebars.compile( Template ),
			modelBinder: new Backbone.ModelBinder(),  		          
			render: function() {
				this.$el.html( this.template );

          		var bindings = { 
          			"kingWenNow" : [{
				        selector: '[name = "kingWenNow"]',
				        elAttribute: "href",
				        converter: this.hexagramLink
				    },
				    {
				        selector: '[name = "kingWenNow"]'
				    }],
					"kingWenFuture" : [{
				        selector: '[name = "kingWenFuture"]',
				        elAttribute: "href",
				        converter: this.hexagramLink
				    },
				    {
				        selector: '[name = "kingWenFuture"]'
				    }],

				 };

				this.modelBinder.bind(this.model, this.el, bindings);

			},
			hexagramLink : function (direction, value) {
				var baseURL = 'http://www2.unipr.it/~deyoung/I_Ching_Wilhelm_Translation.html#'
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
						/*
						+'<span style="left: -58px; top: 4px; position: relative;">'+
						'<svg width="20" height="20">'+
						'<line x1="0"  y1="0"    x2="20" y2="20" style="stroke:#000000; stroke-width: 3; stroke-opacity: 0.5;"/>'+	
						'<line x1="20" y1="0"    x2="0"  y2="20" style="stroke:#000000; stroke-width: 3; stroke-opacity: 0.5;"/>'+						
						'</svg></span>';
						*/	
						break;						

					// --0--
					case 1: case 2: case 3:
						monogram = '<span class="monogram old">&#9866;</span>'
						/*
						+'<span style="left: -60px; top: 5px; position: relative;">'+
						'<svg width="25" height="25"><circle cx="13" cy="13" r="10" style="stroke:#000000; stroke-width: 3; stroke-opacity: 0.5; fill-opacity: 0;"/></svg></span>';	
						
						*/
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
				console.log("Rendering sequence: " + this.model.nowSequence)
				
				for (var i = 0, l = this.model.nowSequence.length; i < l; i++ ) {
					this.renderLine(i, this.model.nowSequence, 'hexagram');
				}
			},
			renderFutureHexagram : function() {
				console.log("Rendering future sequence: " + this.model.futureSequence)

				for (var i = 0, l = this.model.futureSequence.length; i < l; i++ ) {
					this.renderLine(i, this.model.futureSequence, 'futureHexagram');
				}
			}			
		});

		return new view();
	}
); 