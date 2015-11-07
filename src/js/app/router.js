// essentially a controller
define([
  'backbone',
  'jquery',
  'iChing',
  'DivinationView',
  'HexagramView',
  'HexagramModel',
  'js/about/view.about',
  'js/app/app',
  'js/trigram/view.trigramList',
  'js/trigram/collection',
  'js/trigram/view',
  'HexagramBrowser',
  'js/hexagram/HexagramIndex',
  'js/backbone.autocomplete.js'
], function(
  Backbone, 
  jq,
  iChing, 
  DivinationView, 
  HexagramView, 
  HexagramModel, 
  About, 
  App, 
  TrigramList, 
  TrigramCollection,
  Trigram,
  HexagramBrowser,
  HexagramIndex,
  AutoCompleteView
  ){
  return Backbone.Router.extend({
    routes: {
      'yijing/:kingWen': function(kingWen){
        $('#spinner').show();
      
        
        var hexagram = new HexagramModel({id : kingWen});    
        
        hexagram.on("ready", function () {
          new HexagramView({ model: hexagram }).render()

          Trigram.listenTo(TrigramCollection, 'reset', function(e){
            // now the collection is available and we can do stuff
            Trigram.render( TrigramCollection.get( hexagram.get("above") ), '#above' )
            Trigram.render( TrigramCollection.get( hexagram.get("below") ), '#below' )  
          }) 

          // then load the actual collection that will trigger the listeners
          TrigramCollection.load();
          $('#spinner').hide();
        });

      },

     
      'oracle' : function() {
        $('#spinner').show();
        DivinationView.render();

        DivinationView.model.makeHexagram();  
        
        DivinationView.model.on('hexagramComplete', function(){
          $('#spinner').hide();
          DivinationView.renderHexagram();
          DivinationView.renderFutureHexagram();

        });
        
      },
      'about' : function() {
        $('#spinner').hide();
        About.render()

      },

      'browser' : function() {

        $('#spinner').hide();

        HexagramBrowser.render();

        HexagramIndex.on('change:autocompleteIndex', function() {
          // AutoCompleteView needs collection of models that it searches through
            var collection = Backbone.Collection.extend();
        
            var acv = new AutoCompleteView({
              input: $("#searchField"),
              // we set the model of AutoCompleteView to be our recently defined collection
              // as that collection is constructed, it uses the autoCompleteIndex as it's data source
              // Backbone is smart enough to use each autocompleteIndex[ {Oject} ] as a data source 
              // for the models in our Backbone collection. Such amaze!
              model: new collection( HexagramIndex.get("autocompleteIndex") ),
              
              // this is callback function for the onSelect event
              onSelect: function (selectedModel) {
                  $("#selected").show().find("p").html( selectedModel.get("label") );
                  HexagramBrowser.model.set("binaryHexagram", HexagramBrowser.model.fuxiToBinary( selectedModel.get("fuxi")  ));
                  HexagramBrowser.trigger('change:binaryHexagram');
              }
            })
            // we set up this extra event to be triggered once AutoCompleteView is done initing
            .on('updateDOM', function() {
              HexagramBrowser.updateDOM() // loads texts
            })
            .render();        
        });

        // sometimes the change:autocompleteIndex index gets fired before the event is triggered
        // in that case we trigger it again
        if (HexagramIndex && HexagramIndex.get("done") == true) {
          console.log("Event fired before listener was defined. Triggering event change:autocompleteIndex again.")
          HexagramIndex.trigger('change:autocompleteIndex');
        }




      },

      'search/:query' : function(query) {
        $('#spinner').hide();




      },

        /*
         BAGUA PLAYGROUND FOR DEBUGGING
        */

      'bagua' : function() {
        $('#spinner').hide();


        Trigram.listenTo(TrigramCollection, 'reset', function(e){
          // now the collection is available and we can do stuff
          Trigram.render( TrigramCollection.get(5), '#mainView' )
          Trigram.render( TrigramCollection.get(1), '#mainView' )          
        }) 

        // then load the actual collection that will trigger the listeners
        TrigramCollection.load();

      },      
      // Default
      '*actions': 'defaultAction', // <- emit defaultAction event
    },

    initialize: function(options){

      
      this.on('route:defaultAction', function(actions){

        // DEFAULT LANDING PAGE (first thing the user sees =)
        App.start()
        $('#spinner').hide();


 
      });

      this.on('url-changed', function(actions){
        console.log('route event')
      });
    }    

  });
});  