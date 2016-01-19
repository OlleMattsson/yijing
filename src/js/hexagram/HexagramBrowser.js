/*
	DEPS
*/
define([
	'backbone','jquery','handlebars',
	'text!templates/HexagramBrowser.html','text!templates/yin.svg','text!templates/yang.svg',
	'HexagramModel', 'AutoCompleteView'
], function(
	Backbone, $, Handlebars,
	html, yinSVG, yangSVG,
	HexagramModel, AutoCompleteView
){



/*
	VIEW MODEL DEFINITION
*/
var ViewModel = Backbone.Model.extend({
	defaults : {
		binaryHexagram : [0,0,0,0,0,0],
		FuXiNumber : '0',
		KingWenNumber : '2',
		index : [],
		indexReady : false				
	},

	initialize : function(){
		this.on('change:binaryHexagram', function(){
			this.set(  'FuXiNumber',     parseInt(  this.get('binaryHexagram').join(''),2   ));
			this.set(  'KingWenNumber',  this.binaryToKingWen(  this.get('binaryHexagram')  ));
		});

		this.on('change:index', function() {
			this.set('indexReady', true);
		});

		this.constructIndex();					
	},

	constructIndex : function () {  // <- should be collection instead


		var index = [],
			hexagramData = [],
			counter = 0;

		for (var i = 0; i < 64; i++){
			var current = new HexagramModel({id : this.binaryToKingWen(i)});
			hexagramData.push(  current  );
    	}

    	current.on("ready", function () {
    		counter++;
    		if (counter == 64) {
    			this.set("hexagramData", hexagramData);
    			this.trigger("HexagramData-Ready")
    		}
    	}, this);

    	this.on("HexagramData-Ready", function(){

	    	for (var j = 0; j < 64; j++ ) {
	    		index.push({
	    			"label" : 
	    			
	    			hexagramData[j].get('kingwen') + '. ' +
	    			hexagramData[j].get('nameMan') + ' - ' +
	    			hexagramData[j].get('nameEng') 
	    			
	    			// + ' ('+ hexagramData[j].get('fuxi') + ')'
	    			
	    			,
	    			"fuxi" : hexagramData[j].get('fuxi')
	    		});
	    	}
	    	this.set("index", index)

    	});		
	},	

	toggleLineState : function(line){
		line = line-1;
		var lines = this.get("binaryHexagram");
		currentState = lines[line];
		currentState == 0 ? lines[line] = 1 : null;
		currentState == 1 ? lines[line] = 0 : null;

		this.set("binaryHexagram", lines);
		this.trigger('change:binaryHexagram') // must be done manually
	},

	fuxiToBinary : function(fuxi) { //eg. 3 -> [0,0,0,0,1,1]
		var bin = "",
			arr = [],
		  	length = 6

		while(length--) {
			bin += (fuxi >> length ) & 1;    
		}  

		arr = bin.split("");
		return arr;	
	},	

	kingWenToBinary : function(kingWen) { //eg. 3 -> [1,0,0,0,1,0]
		var bin = "", 
			arr = [],
		  	length = 6,
			kingWenSequence = [2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47,  6,	46, 18, 48, 57, 32, 50, 28, 44, 24, 27,  3, 42, 51, 21, 17, 25,	36, 22, 63, 37, 55, 30, 49, 13, 19, 41, 60, 61, 54, 38, 58, 10,	11, 26,  5,  9, 34, 14, 43,  1],
			fuxi = kingWenSequence.indexOf(parseInt(kingWen));
		
		while(length--) {
			bin += (fuxi >> length ) & 1;    
		}

		arr = bin.split("");
		return arr;	
	},		

	binaryToKingWen : function (source) { // source: arr[0,0,0,0,0,0]  OR int 0 - 63
		var kingWenSequence = [2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29, 59, 40, 64, 47,  6,	46, 18, 48, 57, 32, 50, 28, 44, 24, 27,  3, 42, 51, 21, 17, 25,	36, 22, 63, 37, 55, 30, 49, 13, 19, 41, 60, 61, 54, 38, 58, 10,	11, 26,  5,  9, 34, 14, 43,  1];
		if( source && source.length == 6 ) {
			return kingWenSequence[ parseInt(source.join(''), 2) ];	
		} else {
			return kingWenSequence[ source ];
		}
	},


});



/* 
	VIEW DEFINITIONS 
*/



var View = Backbone.View.extend({
	el : '#mainView',
	template: Handlebars.compile( html ),
	tagName: 'div', 
	model : new ViewModel(),
	$searchField : $('#searchField'),
	autocomplete : null,
	events : {
		"click .line" : function(e) {
			this.model.toggleLineState(e.currentTarget.dataset.line); // update binaryHexagram
		},
		"focus #searchField" : function() {
			this.SelectText('searchField');
		},
		"click #next" : function () {
			current = parseInt(this.model.get('KingWenNumber'));
			next = current < 64 ? current + 1 : 1;
			this.model.set('binaryHexagram', this.model.kingWenToBinary(  (next)  ));
		},
		"click #previous" : function () {
			current = parseInt(this.model.get('KingWenNumber'));
			next = current > 1 ? current - 1 : 64; 
			this.model.set('binaryHexagram', this.model.kingWenToBinary( next ));
		},
	},
	initialize : function(){
		console.log("first");
		this.model.on('change:binaryHexagram', function(e, newValue){ 
			console.log("change:binaryHexagram")
			this.updateDOM();
			//this.renderSVGfromModel();
			
		} , this);
	},

	render : function() {
		var collection = Backbone.Collection.extend()
			browserView = this;

		this.$el.html( this.template( ) );

		/*
		$('#HexagramBrowser-Lines .line').each(function(key, val){
			$(this).html(yinSVG);
		})
		*/

		this.renderSVGfromModel();


        this.model.on('change:index', function() {

	        browserView.autocomplete = new AutoCompleteView({
	          input: $("#searchField"),
	          model: new collection( browserView.model.get("index") ),

	          onSelect: function (selectedModel) {
	              $("#selected").show().find("p").html( selectedModel.get("label") );
	              browserView.model.set("binaryHexagram", browserView.model.fuxiToBinary( selectedModel.get("fuxi")  ));
	              browserView.trigger('change:binaryHexagram');
	          }
	        })
	        .on('render-done', function() {
	          //browserView.updateDOM()
	        })
	        .render();

        });

        if (this.model.get("indexReady") == true) {
          console.log("change:index event fired before this.model.on('change:index') listener was ready. Triggering event change:autocompleteIndex again.")
          this.model.trigger('change:index');
        }        

		return this;
	},

	updateDOM : function() {
		var hex = new HexagramModel({id : this.model.get('KingWenNumber')  }),
			browserView = this;
		hex.on("ready", function(){
			
			 // + ' (' + hex.get("fuxi") + ')'
				

			//console.log( hex );

			browserView.$el.html( browserView.template( hex.toJSON() ) );

			browserView.renderSVGfromModel();

			$("#searchField").html( hex.get('kingwen') + '. ' + hex.get("nameMan") + ' - ' + hex.get("nameEng")
			);

			browserView.autocomplete.render();
			/*
			$("#description").html(hex.get('description'))
			$("#judgement").html(hex.get('judgement'))
			$("#image").html(hex.get('image'))
			*/
		});		
	},	

	// select all text in an element
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
		// How to get at the keyname and value of something that looks like { line6 : 1 }
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