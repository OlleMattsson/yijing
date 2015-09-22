define([
	'backbone', 
	'HexagramModel'
	], 
	function(Backbone, Hexagram){

		var DiviniationModel = Backbone.Model.extend({
			nowSequence : [],
			futureSequence : [],
			binaryNowSequence : [],
			binaryFutureSequence : [],
			fuXiNow : '',
			kingWenNow : '',
			fuXiFuture : '',
			kingWenFuture : '',
			

			makeHexagram : function() {
				var model = this,	
					howmany = 24,	// how many random numbers to fetch from qrng
					randomNumbers;	// place to store our numbers			

				model.on("random-fetch-complete", function() {
					// produce  the six lines of the hexagram
					for (var i = 0; i < 6; i++)	 {
						var arr = this.randomNumbers.slice(i*4, i*4+4); // pick next 4 numbers from our set of 24
						this.nowSequence[i] = this.makeLineWithFourCoins(arr); 
					}

					this.makeFutureHexagram();

					this.convertToBinarySequence(this.nowSequence, this.binaryNowSequence);
					this.set('fuXiNow', parseInt(this.binaryNowSequence.join(''), 2) ); 
					this.set('kingWenNow',this.binaryToKingWen(this.binaryNowSequence) );

					this.convertToBinarySequence(this.futureSequence, this.binaryFutureSequence);
					this.set('fuXiFuture', parseInt(this.binaryFutureSequence.join(''), 2) );
					this.set('kingWenFuture', this.binaryToKingWen(this.binaryFutureSequence) );
				

					

					model.trigger('hexagramComplete');
				});

				// get some unpredictable numbers!
				this.getUnpredictableNumbers(24); // 4 * 6
			},

			makeFutureHexagram : function() {
				for(var i = this.nowSequence.length; i >= 0; i--) {
					switch (this.nowSequence[i]) {
						
						// --x--
						case 0:
							this.futureSequence[i] = 4; // becomes yang
							break;

						// --0--
						case 1: case 2: case 3:
							this.futureSequence[i] = 9; // becomes yin	
							break;	

						default:
							this.futureSequence[i] = this.nowSequence[i];
							break;		

						/*
						// -----
						case 4:	case 5: case 6:	case 7:	case 8: 
							this.futureSequence[i] = this.nowSequence[i]; // doesn't change				
							break;

						// -- --		
						case 9:	case 10: case 11: case 12: case 13: case 14: case 15: 
							this.futureSequence[i] = this.nowSequence[i]; // doesn't change				
							break; 	
						*/												
					}					
				}				
			},

			convertToBinarySequence : function(source, target) {
				for(var i = 0, l = source.length; i < l; i++) {
					switch (source[i]) {
						
						// -- --
						case 0: case 9:	case 10: case 11: case 12: case 13: case 14: case 15: 
							target[i] = 0;
							break;	

						// -----
						case 4:	case 5: case 6:	case 7:	case 8: case 1: case 2: case 3:
							target[i] = 1;				
							break;
					}					
				}	
			},

			renderHexagramInConsole : function() {
				// lookup
				// https://en.wikipedia.org/wiki/I_Ching_divination#Four_coins
				for(var i = this.nowSequence.length; i >= 0; i--) {
					switch (this.nowSequence[i]) {
						
						// --x--
						case 0:
							//console.log('yin changing') 
							console.log('--x--') 	
							break;

						// --0--
						case 1: case 2: case 3:
							//console.log('yang changing')
							console.log('--0--') 	
							break;		

						// -----
						case 4:	case 5: case 6:	case 7:	case 8: 
							//console.log('yang')
							console.log('-----') 				
							break;

						// -- --		
						case 9:	case 10: case 11: case 12: case 13: case 14: case 15: 
							//console.log('yin')	
							console.log('-- --') 			
							break; 						
					}					
				}
			},

			getUnpredictableNumbers : function(howmany){
				var model = this;
				$.ajax({
					method: 'GET',
					url: 'https://qrng.anu.edu.au/API/jsonI.php?length='+ howmany +'&type=uint8'
				})
				.done(function(res){
					model.randomNumbers = res.data;	
					model.trigger("random-fetch-complete");
				})
			},

			makeLineWithFourCoins : function (numbersArray){
				var normalized = [], decimal;

				// normalize values 0-255 to 0 (tails) or 1 (heads)
				for (var i = 0, l = numbersArray.length; i < l; i++) {
					normalized[i] = Math.round(numbersArray[i] / 255);
				}

				// convert our binary number to a decimal
				var decimal = parseInt(normalized.join(''), 2);
				
				return decimal;
			},

			binaryToKingWen : function (source) {
				var kingWen = [
					 2, 23,  8, 20, 16, 35, 45, 12,
					15, 52, 39, 53, 62, 56, 31, 33,
					 7,  4, 29, 59, 40, 64, 47,  6,
					46, 18, 48, 57, 32, 50, 28, 44,
					24, 27,  3, 42, 51, 21, 17, 25,
					36, 22, 63, 37, 55, 30, 49, 13,
					19, 41, 60, 61, 54, 38, 58, 10,
					11, 26,  5,  9, 34, 14, 43,  1	
				];

				if( source.length == 6 ) {
					return kingWen[ parseInt(source.join(''), 2) ];	
				}		
			},



			/*  
				LEGACY divination: the three coin method does not produce lines 
				at the same frequencies as original yarrow stick model
			*/

			// expect array of three ints between 0 - 255
			makeLineThreeCoins : function(numbers) {
				var normalized = [], sum = 0;
				console.log(numbers);
				if (numbers && numbers.length == 3 ) {

					for (var i = 0, l = numbers.length; i < l; i++) {
						console.log(numbers[i])
						normalized[i] = Math.round(numbers[i] / 255);
					} 

					for (var i = 0, l = normalized.length; i < l; i++) {
						if (normalized[i] == 1) {
							console.log('heads');
							sum += 2;
						} else if (normalized[i] == 0) {
							console.log('tails');
							sum += 3;
						} else {
							return false;
						}
 					}

 					switch (sum) {
 						case 6: 
 							console.log('yin chaning') 	// --x--
 							break;
 						case 7: 
 							console.log('yang')			// -----
 							break; 						
 						case 8: 
 							console.log('yin')			// -- --
 							break; 						
 						case 9: 
 							console.log('yang changing')// --0--
 							break;
 					}
				}
				return normalized;
			}	


		});

		return new DiviniationModel();


});