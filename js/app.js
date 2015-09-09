define([
  'jquery', 
  'backbone', 
  'handlebars',
  'router',
  'text!templates/appMainView.html',
], function($, Backbone, Handlebars, Router, appMainViewTemplate){

    var AppModel = Backbone.Model.extend({
      defaults : {
        appTitle : "Backbone Playground"
      }
    });



    var AppView = Backbone.View.extend({
      className : "AppView",
      template: Handlebars.compile( appMainViewTemplate ),        
      render: function() {
        this.$el.html( this.template( this.model.toJSON()) );
      }
    });


  var start = function(){
      new Router();

      var appModel = new AppModel();
      var appView = new AppView({model : appModel});
      appView.render();
      $('body').html( appView.el )


      Backbone.history.start();
      console.log('app.js running')
  }

  return {
    start: start
  };
});