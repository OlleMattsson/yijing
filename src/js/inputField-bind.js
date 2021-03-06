/*
    Home made input field module with ModelBinder for 2way data binding
*/
define([
  'jquery',     
  'backbone', 
  'handlebars',
  'ModelBinder',    // ModelBinder will handle databinding for us
  'text!templates/inputField.html'   
], function($, Backbone, Handlebars, ModelBinder, templateHTML){
  	
    var model = Backbone.Model.extend({
      defaults : { 
        id : "inputField2",
        value : "hmm text..."
      },
    });

  	var view = Backbone.View.extend({
      tagName : 'oms',    
      className : 'input',       
      model : new model(),
      _modelBinder: undefined, // define ModelBinder in the view                
  		template: Handlebars.compile(templateHTML),

      initialize : function(elementSelector) { 
        this._modelBinder = new Backbone.ModelBinder(); // Initialize ModelBinder
        this.render();                                       
        $(elementSelector).append(this.el);
      },

  		render : function(){
  		    // update html
          this.$el.html( this.template( this.model.toJSON()) );

          // ModelBinder-magic =)
          this._modelBinder.bind(this.model, this.el);

          return this;
      },

      events : {
        "keyup" : function(event){
           var val = $(event.target).context.value;
           this.model.set({'value': $(event.target).context.value });
        }
      },

      close: function(){
        this._modelBinder.unbind();
      }
 
      
  	});

  return view; 
  
});