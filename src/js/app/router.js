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
      // listen to defaultAction event
      this.on('route:defaultAction', function(actions){
        App.start()
        $('#spinner').hide();




    HexagramIndex.on('change:autocompleteIndex', function() {
      // do something that needs the index
      console.log(  HexagramIndex.get("autocompleteIndex") );
      


        var Plugin = Backbone.Model.extend({
          label: function () {
              return this.get("name");
          }
        });

        var PluginCollection = Backbone.Collection.extend({
          model: Plugin
        });

        var plugins = new PluginCollection(
          HexagramIndex.get("autocompleteIndex")
        );

        console.log(  plugins );

        new AutoCompleteView({
          input: $("#plugin"),
          model: plugins,
          onSelect: function (model) {
              console.log(model);
              $("#selected").show().find("p").html(model.label());
          }
        }).render();

    }); 



      });

      this.on('url-changed', function(actions){
        console.log('route event')
      });
    }    

  });
});  