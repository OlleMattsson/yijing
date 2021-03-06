define([
	'backbone',
	'HexagramModel'
], function(
	Backbone,
	HexagramModel
){
var model = Backbone.Model.extend({

defaults : {
	index : [],
	autocompleteIndex : [],
	done : false
},

	initialize : function (){
		// create an index
		//this.constructIndex()
		this.constructAutocompleteIndex()

		this.on('change:index', function() {
			// do something that needs the index
			console.log(  this.get("index")  );
		});

		this.on('change:autocompleteIndex', function() {
			// do something that needs the index
			console.log(  "change:autocompleteIndex" );
			this.set('done', true)
		});		
	},
	
	constructAutocompleteIndex : function () {
		var index = [],
			hexagramData = [],
			counter = 0;

		for (var i = 0; i < 64; i++){
			var current = new HexagramModel({id : this.fuxiToKingWen(i)});
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
	    			'('+hexagramData[j].get('fuxi') + ') ' +
	    			hexagramData[j].get('kingwen') + '. ' +
	    			hexagramData[j].get('nameMan') + ' - ' +
	    			hexagramData[j].get('nameEng'),
	    			"fuxi" : hexagramData[j].get('fuxi')
	    		});
	    	}
	    	this.set("autocompleteIndex", index)
    	});		
	},

	fuxiToKingWen : function (fuxi) {
		var kingWenSequence = [2, 23,  8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7,  4, 29, 59, 40, 64, 47,  6, 46, 18, 48, 57, 32, 50, 28, 44, 24, 27,  3, 42, 51, 21, 17, 25, 36, 22, 63, 37, 55, 30, 49, 13, 19, 41, 60, 61, 54, 38, 58, 10, 11, 26,  5,  9, 34, 14, 43,  1];
		return kingWenSequence[ fuxi ];				
	},

	constructIndex : function(){
		var index = [],
			hexagramData = [],
			counter = 0;

		for (var i = 0; i < 64; i++){
			var current = new HexagramModel({id : this.fuxiToKingWen(i)});
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
	    		console.log(hexagramData[j])
	    		index.push([
	    			hexagramData[j].get('fuxi'), 
	    			hexagramData[j].get('kingwen'), 
	    			hexagramData[j].get('nameMan').toLowerCase(), 
	    			hexagramData[j].get('nameEng').toLowerCase()
	    		]);
	    	}
	    	this.set("index", index)
    	});
	},




	search : function(searchString) {
		console.log("Search for: " + searchString );

		var hexagram = this.get("index"),
			l = hexagram.length,
			result = [];

		for (var i = 0; i < l; i++ ) {
			if (hexagram[i][0].indexOf(searchString) > -1) {
				result.push(  hexagram[i]  );
			}							
			if (hexagram[i][1].indexOf(searchString) > -1) {
				result.push(  hexagram[i]  );
			}			
			if (hexagram[i][2].indexOf(searchString) > -1) {
				result.push(  hexagram[i]  );
			}			
			if (hexagram[i][3].indexOf(searchString) > -1) {
				result.push(  hexagram[i]  );
			}
		}
		return result;
	},

	searchKingWen : function(kingwen) {
		var hexagram = this.get("index"),
			l = hexagram.length,
			result = [];

		for (var i = 0; i < l; i++ ) {					
			if (hexagram[i][1] == kingwen) {
				return new HexagramModel( { id : this.fuxiToKingWen(i) });
			}			
		}
	},


});
return new model();
});