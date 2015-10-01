// essentially a controller
define([
  'backbone',
  'iChing',
  'DivinationView',
  'HexagramView',
  'HexagramModel',
  'js/view.about',
  'js/app/app'
], function(Backbone, iChing, DivinationView, HexagramView, HexagramModel, About, App){
  return Backbone.Router.extend({
    routes: {
      'yijing/:kingWen': function(kingWen){
        $('#spinner').hide();

        var hexagram = new HexagramModel({id : kingWen});    
        hexagram.on("change", function (model) {
          new HexagramView({ model: hexagram }).render()
        });
      },
      'yijing' : function(){
        $('#spinner').hide();
        var hexagram = new HexagramModel({id : 1});
        hexagram.on("change", function (model) {
          new HexagramView({ model: hexagram }).render()
        });
      },      
      'oracle' : function() {
        //var view = DivinationView;
            DivinationView.render();

            DivinationView.model.makeHexagram();  
            
            DivinationView.model.on('hexagramComplete', function(){
              $('#spinner').hide();
              DivinationView.renderHexagram();
              DivinationView.renderFutureHexagram();

            });
        
      },
      'about' : function() {
        About.render()
      },
      // Default
      '*actions': 'defaultAction', // <- emit defaultAction event
    },

    initialize: function(options){
      // listen to defaultAction event
      this.on('route:defaultAction', function(actions){
        App.start()
        $('#spinner').hide();
      });

      this.on('route:change', function(actions){
        App.start()
        $('#spinner').show();
      });
    }    

  });
});  