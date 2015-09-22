define([
  'jquery', 
  'backbone', 
  'handlebars',
  'router',
  'text!templates/appMainView.html',
], function($, Backbone, Handlebars, Router, appMainViewTemplate){

    var AppModel = Backbone.Model.extend({
      defaults : {
        appTitle : "YiJing"
      }
    });



    var AppView = Backbone.View.extend({
      el : "#app",
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
      
      //$('body').html( appView.el )

      new Router();
      Backbone.history.start();
      console.log('app.js is running')
  }

  return {
    start: start
  };
});