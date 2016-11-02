define([
  'jquery', 
  'backbone', 
  'handlebars',
  'text!templates/appMainView.html',
  'HexagramCollection', 
  'HexagramModel', 
  'HexagramBrowser',
  'DivinationView',
  'About'
], function($, 
    Backbone, 
    Handlebars, 
    appMainViewTemplate, 
    HexagramCollection, 
    HexagramModel, 
    HexagramBrowser, 
    DivinationView,
    About
){

/* Namespace
**************************************************************************************************/
 
  window.yj = {
    App : {},
    Models : {},
    Collections : {},
    Views : {},
    Data : {}
  };


/* Application Model
**************************************************************************************************/
  var AppModel = Backbone.Model.extend({

    defaults : {
      appTitle : "Welcome to the Quantum YiJing",
      isProduction : false,
      yijingProdUrl : 'http://ollemattsson.com/yj/static/yijing.json',
      yijingDevUrl : './../../static/yijing.json'
    },

    // promise that yijing JSON data is available
    yijingDataPromise : function() { 
      var self = this;
      return new Promise( function (resolve, reject) {
        $.ajax({
          url: self.get('isProduction') == true ? self.get('yijingProdUrl') : self.get('yijingDevUrl'),
          success: function (data) { resolve(data) },
          error : function (err) { reject(err) }
        }); 
      }); 
    },

    // promise that a hexagram is available
    hexPromise : function(hexKingWen) {    
      return new Promise( function (resolve, reject) {
        if ( yj.Collections.Hexagrams.ready ) {
          resolve( yj.Collections.Hexagrams.get(hexKingWen) )
        } else {
          window.addEventListener('hexagrams-ready', function() {
            resolve( yj.Collections.Hexagrams.get(hexKingWen) )
          }, false);
        }
      });   
    },

    // promise that a collection of hexagram is available
    hexCollectionPromise : function () {
      return new Promise( function (resolve, reject) {
        if ( yj.Collections.Hexagrams.ready ) {
          resolve( yj.Collections.Hexagrams )
        } else {
          window.addEventListener('hexagrams-ready', function() {
            resolve( yj.Collections.Hexagrams )
          }, false);
        }
      });     
    },

    initialize : function () {

/* Runtime Entry Point
**************************************************************************************************/

      yj.App = this;
      yj.Collections.Hexagrams = new HexagramCollection();
      yj.Models.Hexagram = HexagramModel;
      yj.Views.HexagramBrowser = HexagramBrowser;
      yj.Views.DivinationView = DivinationView;
      yj.Views.About = About;

      yj.Views.HexagramBrowser.model.constructIndex();
  
      yj.App.yijingDataPromise()
      .then( function (raw) {
        var data = []
        for (var i in raw) {
          data.push(raw[i][0])
        }
        yj.Data.yijing = data;
        return;
      })
      .then( function () {
        for (var j in yj.Data.yijing) {
          yj.Collections.Hexagrams.add( new yj.Models.Hexagram( yj.Data.yijing[j] ));
        }
        yj.Collections.Hexagrams.ready = true;    
        window.dispatchEvent( new Event('hexagrams-ready') );
        return;
      })
      .catch( function (error) {
        console.log(error); 
      }); 

    }



  }); 


/* Application View
**************************************************************************************************/

  var AppView = Backbone.View.extend({
    el : "#mainView",
    className : "AppView",
    template: Handlebars.compile( appMainViewTemplate ), 
    model : new AppModel(),
    render: function() {
      this.$el.html( this.template( this.model.toJSON()) );
      return this;
    }
  });




  return new AppView();

});