define([
  'backbone',
  'jquery',
  'About',
  'js/app/app',
  'js/trigram/collection',
  'js/trigram/view',
], function(
  Backbone, 
  jq,
  About, 
  App, 
  TrigramCollection,
  Trigram
  ){
  return Backbone.Router.extend({
    initialize: function(options){
      this.on('route:defaultAction', function(actions){
        App.render()
        $('#spinner').hide(); 
      });
    },   


    routes: {

      /*
      ** HEXAGRAM BROWSER
      *****************************************************************************/

      'hexagram(/:kingWen)': function(kingWen){
        $('#spinner').show();

        yj.Views.HexagramBrowser.render();

        if (kingWen) {
          var arr = yj.Views.HexagramBrowser.model.kingWenToBinary( kingWen );
          yj.Views.HexagramBrowser.model.set('binaryHexagram', arr );
        }    

        $('#spinner').hide();
      },

      

      /*
      ** ORACLE
      *****************************************************************************/     
      
      'oracle' : function() {
        $('#spinner').show();
        var DivinationView = yj.Views.DivinationView;
        DivinationView.render();
        DivinationView.model.makeHexagram();  
        DivinationView.model.on('hexagramComplete', function(){
          $('#spinner').hide();
          DivinationView.renderHexagram();
          DivinationView.renderFutureHexagram();
        });
      },

      /*
      ** ABOUT
      *****************************************************************************/   
      'about' : function() {
        $('#spinner').hide();
        yj.Views.About.render()
      },




      /*
      ** BAGUA TESTING SITE
      *****************************************************************************/   

      'bagua' : function() {
        $('#spinner').hide();


        Trigram.listenTo(TrigramCollection, 'reset', function(e){
          // now the collection is available and we can do stuff
          Trigram.render( TrigramCollection.get(4), '#mainView' )          
          Trigram.render( TrigramCollection.get(2), '#mainView' )          
        }) 

        // then load the actual collection that will trigger the listeners
        TrigramCollection.load();

      }, 




      /*
      ** DEFAULT ROUTE
      *****************************************************************************/  
      '*actions': 'defaultAction', // <- emit defaultAction event
    },
  });
});  