// essentially a controller
define([
  'backbone',
  'iChing',
  'DivinationView',
  'HexagramView',
  'HexagramModel'
], function(Backbone, iChing, DivinationView, HexagramView, HexagramModel){
  return Backbone.Router.extend({
    routes: {
      'iching': function(){
        var iching = new iChing("#modules");
      },
      'hexagram/:kingWen': function(kingWen){
        $('#spinner').hide();

        var hexagram = new HexagramModel({id : kingWen});
        
        
        hexagram.on("change", function (model) {
          new HexagramView({ model: hexagram }).render()
        });


      },
      'divine' : function() {
        //var view = DivinationView;
            DivinationView.render();

            DivinationView.model.makeHexagram();  
            
            DivinationView.model.on('hexagramComplete', function(){
              $('#spinner').hide();
              DivinationView.renderHexagram();
              DivinationView.renderFutureHexagram();

            });
        
      },
      // Default
      '*actions': 'defaultAction', // <- emit defaultAction event
    },

    initialize: function(options){
      // listen to defaultAction event
      this.on('route:defaultAction', function(actions){
        console.log('No route:', actions);
      });
    }    

  });
});  