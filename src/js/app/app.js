define([
  'jquery', 
  'backbone', 
  'handlebars',
  'router',
  'text!templates/appMainView.html',
], function($, Backbone, Handlebars, Router, appMainViewTemplate){

    var AppModel = Backbone.Model.extend({
      defaults : {
        appTitle : "Welcome to the Quantum YiJing"
      }
    });



    var AppView = Backbone.View.extend({
      el : "#mainView",
      className : "AppView",
      template: Handlebars.compile( appMainViewTemplate ),        
      render: function() {
        this.$el.html( this.template( this.model.toJSON()) );
      }
    });


  var start = function(){
      

      var appModel = new AppModel();
      var appView = new AppView({model : appModel});
      appView.render();
  }

  return {
    start: start
  };
});