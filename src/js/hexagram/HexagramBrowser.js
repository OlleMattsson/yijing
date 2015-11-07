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
		binaryHexagram : [0,0,0,0,0,0],
		FuXiNumber : '0',
		KingWenNumber : '2'		
	},

	initialize : function(){
		this.on('change:binaryHexagram', function(){
			this.set('FuXiNumber', parseInt(   this.get('binaryHexagram').join('')   , 2));
			this.set('KingWenNumber', this.binaryToKingWen(   this.get('binaryHexagram')   ));
		});

		
	},

	fuxiToBinary : function(fuxi) { //eg. 8 -> [0,0,1,0,0,0]
		var bin = "",
			arr = [],
		  	length = 6

		while(length--) {
			bin += (fuxi >> length ) & 1;    
		}  

		arr = bin.split("");
		return arr;	
	},

	toggleLineState : function(line){
		line = line-1;
		var lines = this.get("binaryHexagram");
		currentState = lines[line];
		currentState == 0 ? lines[line] = 1 : null;
		currentState == 1 ? lines[line] = 0 : null;

		this.set("binaryHexagram", lines);
		this.trigger('change:binaryHexagram') // yeah
	},

	binaryToKingWen : function (source) { // source: arr[0,0,0,0,0,0]  OR int 0 - 63
		var kingWenSequence = [2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47,  6,	46, 18, 48, 57, 32, 50, 28, 44, 24, 27,  3, 42, 51, 21, 17, 25,	36, 22, 63, 37, 55, 30, 49, 13, 19, 41, 60, 61, 54, 38, 58, 10,	11, 26,  5,  9, 34, 14, 43,  1];
		if (source && source.length == 1) {
			return kingWenSequence[ source ];
		}
		if( source && source.length == 6 ) {
			return kingWenSequence[ parseInt(source.join(''), 2) ];	
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
			this.model.toggleLineState(e.currentTarget.dataset.line); // update binaryHexagram
		},
		"keyup #searchField" : function(e) {
			//console.log(  'keyup');
		},
		"focus #searchField" : function() {
			//$('#searchField').select();
			this.SelectText('searchField');
		}
	},

	updateDOM : function() {
		var hex = new HexagramModel({id : this.model.get('KingWenNumber')  })
		hex.on("ready", function(){
			$("#searchField").html( '(' + hex.get("fuxi") + ') ' + hex.get('kingwen') + '. ' + hex.get("nameMan") + ' - ' + hex.get("nameEng"));	
			$("#description").html(hex.get('description'))
			$("#judgement").html(hex.get('judgement'))
			$("#image").html(hex.get('image'))
		});		
	},

	initialize : function(){
	/* 
		MODEL EVENTS 
	*/
		/*
		this.model.on('change:line1 change:line2 change:line3 change:line4 change:line5 change:line6', 
			this.renderSVG, this); //
		*/


		

		this.model.on('renderDOM', function(){
			this.updateDOM();	
		});
		
		this.model.on('change:binaryHexagram', function(e, newValue){ 
			this.renderSVGfromModel();
			this.updateDOM();
		} , this);

		 //this.model.trigger('change:binaryHexagram'); // inits the thing

		
		/*
		this.model.on('change:FuXiNumber', function(){ 
		
			//console.log( "Redraw the DOM" ); 

		}, this);
		
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
		*/

	},

	render : function() {
		this.$el.html( this.template( ) );

		$('#HexagramBrowser-Lines .line').each(function(key, val){
			$(this).html(yinSVG);
		})

		//

		return this;
	},

	SelectText : function(element){
	    var doc = document
	        , text = doc.getElementById(element)
	        , range, selection
	    ;    
	    if (doc.body.createTextRange) {
	        range = document.body.createTextRange();
	        range.moveToElementText(text);
	        range.select();
	    } else if (window.getSelection) {
	        selection = window.getSelection();        
	        range = document.createRange();
	        range.selectNodeContents(text);
	        selection.removeAllRanges();
	        selection.addRange(range);
	    }
	},


	renderSVGfromModel : function() {
		var hexagram = this.model.get("binaryHexagram");

		for (var i = 0; i < 6; i++) {
			DOMtarget = '#line' + (i+1);
			if (hexagram[i] == 0) {
				$(DOMtarget).html(yinSVG);
			} else {
				$(DOMtarget).html(yangSVG);	
			}
		}

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