/*
    Home made input field module =)
*/
define([
  'jquery',     
  'backbone', 
  'handlebars',
  'text!templates/inputField.html'   
], function($, Backbone, Handlebars, templateHTML){
  	
    var model = Backbone.Model.extend({
      defaults : { 
        id : "inputField1",
        value : "Default text..."
      },
    });

  	var view = Backbone.View.extend({
      tagName : 'oms',
      className : 'input',
      model : new model(),      
  		template: Handlebars.compile(templateHTML),

      initialize : function(selector) {        
        this.render();
        $(selector).append(this.el);
        this.model.on("change", this.render, this);
      },

  		render : function(){
  		    // update html
          this.$el.html( this.template( this.model.toJSON()) );

          // lol: the extra .val( this.$el.find("input").val() at the end is to force the cursor to the end of the string
          this.$el.find("input").focus().val( this.$el.find("input").val() ); 
          return this;
      },     
       
      events : {
        "keyup" : function(event){
           var val = $(event.target).context.value;
           this.model.set({'value': $(event.target).context.value });
        }
      } 
      
  	});

  return view; 
  
});