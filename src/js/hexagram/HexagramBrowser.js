define([
	'backbone',
	'jquery',
	'handlebars',
	'text!templates/HexagramBrowser.html',
	'text!templates/yin.svg',
	'text!templates/yang.svg',
	'js/hexagram/HexagramIndex',
	'HexagramModel'
], function(
	Backbone,
	$,
	Handlebars,
	html,
	yinSVG,
	yangSVG,
	HexagramIndex,
	HexagramModel
){
var ViewModel = Backbone.Model.extend({
	defaults : {
		// line states
		line1 : 0,
		line2 : 0,
		line3 : 0,
		line4 : 0,
		line5 : 0,
		line6 : 0,
		binaryHexagram : [0,0,0,0,0,0],
		FuXiNumber : '',
		KingWenNumber : ''		
	},
	initialize : function(){
		/* 
			INTERNAL MODEL EVENTS
		*/
		this.on('change:line1 change:line2 change:line3 change:line4 change:line5 change:line6', 
			function(){
				this.set('binaryHexagram', this.makeBinaryHexagram() );
				this.set('FuXiNumber', parseInt(   this.get('binaryHexagram').join('')   , 2));
				this.set('KingWenNumber', this.binaryToKingWen(   this.get('binaryHexagram')   ));
			}, this);
	},
	toggleLineState : function(line){
		var currentState = this.get("line"+line)
		currentState == 0 ? this.set("line"+line, 1 ) : null;
		currentState == 1 ? this.set("line"+line, 0) : null;
	},
	makeBinaryHexagram : function(){
		var binaryHexagram = [];
		binaryHexagram.push( this.get('line1') );
		binaryHexagram.push( this.get('line2') );
		binaryHexagram.push( this.get('line3') );
		binaryHexagram.push( this.get('line4') );
		binaryHexagram.push( this.get('line5') );
		binaryHexagram.push( this.get('line6') );
		return binaryHexagram;			
	},
	binaryToKingWen : function (sourceArray) { // sourceArray: [0,0,0,0,0,0]
		var kingWenSequence = [
			 2, 23,  8, 20, 16, 35, 45, 12, // 0
			15, 52, 39, 53, 62, 56, 31, 33, // 8
			 7,  4, 29, 59, 40, 64, 47,  6, // 16
			46, 18, 48, 57, 32, 50, 28, 44, // 24
			24, 27,  3, 42, 51, 21, 17, 25, // 32
			36, 22, 63, 37, 55, 30, 49, 13, // 40
			19, 41, 60, 61, 54, 38, 58, 10, // 48
			11, 26,  5,  9, 34, 14, 43,  1	// 56
		];
		if( sourceArray.length == 6 ) {
			return kingWenSequence[ parseInt(sourceArray.join(''), 2) ];	
		}		
	}
});

var View = Backbone.View.extend({
	el : '#mainView',
	template: Handlebars.compile( html ),
	tagName: 'div', 
	model : new ViewModel(),
	$searchField : $('#searchField'),

	/* 
		DOM EVENTS 
	*/
	events : {
		"click .line" : function(e) {
			this.model.toggleLineState(e.currentTarget.dataset.line);
		},
		"keyup #searchField" : function(e) {
			console.log(  HexagramIndex.search(  $('#searchField').html()  ));
		}
	},


	initialize : function(){
	/* 
		MODEL EVENTS 
	*/
		
		this.model.on('change:line1 change:line2 change:line3 change:line4 change:line5 change:line6', 
			this.renderSVG, this); //

		/*
		this.model.on('change:binaryHexagram', function(e, newValue){ 
			console.log(newValue);
		} , this);
		*/
		// this.model.on('change:FuXiNumber', function(){ console.log(this.model.get('FuXiNumber') ); }, this);
		
		this.model.on('change:KingWenNumber', function(){ 
			var hex = new HexagramModel({id : this.model.get('KingWenNumber')  })
			hex.on("ready", function(){
				$("#searchField").html( '(' + hex.get("fuxi") + ') ' + hex.get('kingwen') + '. ' + hex.get("nameMan") + ' - ' + hex.get("nameEng"));	
				$("#description").html(hex.get('description'))
				$("#judgement").html(hex.get('judgement'))
				$("#image").html(hex.get('image'))
			});
		}, this);

		HexagramIndex.on("change:index", function(){
          //console.log(HexagramIndex.get("index"))
        })

	},

	render : function() {
		this.$el.html( this.template( ) );

		$('#HexagramBrowser-Lines .line').each(function(key, val){
			$(this).html(yinSVG);
		})
		return this;
	},

	renderSVG : function(e){
		// How to get at the keyname and value of sometling that looks like { line6 : 1 }
		var obj = e.changed,							// {lineX : 0 / 1}
			
			/* verbose
			arr = Object.keys(obj),						// ["lineX"]
			key = arr[0],								// lineX (String)
			value = obj[key],							// 0 / 1
			*/

			// also neat =)
			key = Object.keys(obj)[0], 				
			value = obj[Object.keys(obj)[0]],				
										
			// This is what we need
			DOMtarget = '#'+ key,		
			newState = obj[Object.keys(obj)[0]] 
			;

		if (newState == 0) {
			$(DOMtarget).html(yinSVG)	
		} else {
			$(DOMtarget).html(yangSVG)
		}
	}

});

return new View();

})