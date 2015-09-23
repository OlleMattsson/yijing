// essentially a controller
define([
  'backbone',
  'iChing',
  'DivinationView'
], function(Backbone, iChing, DivinationView){
  return Backbone.Router.extend({
    routes: {
      'iChing': function(){
        var iching = new iChing("#modules");
      },
      'divine' : function() {
        var view = DivinationView;
            view.render();

            view.model.makeHexagram();  
            
            view.model.on('hexagramComplete', function(){
              $('#spinner').hide();
              view.renderHexagram();
              view.renderFutureHexagram();

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