// essentially a controller
define([
  'backbone',
  'inputField',
  'inputFieldBind',
  'iChing',
  'DivinationModel',
  'DivinationView'

], function(Backbone, inputField, inputFieldBind, iChing, DivinationModel, DivinationView){
  return Backbone.Router.extend({
    routes: {
      // <url> : <event>
      'input': function() {
        var input = new inputField("#modules");
      },
      'inputBind': function(){
        var inputbind = new inputFieldBind("#modules");
      },
      'iChing': function(){
        var iching = new iChing("#modules");
      },
      'divine' : function() {
        var view = DivinationView;
            view.render();

            view.model.makeHexagram();  
            
            view.model.on('hexagramComplete', function(){
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