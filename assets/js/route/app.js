define(
  'route/app',
  [
    'jquery',
    'backbone',
    'view/userCreate'
  ],
  function($, Backbone, UserCreate){
    'use strict';

    var AppRoute = Backbone.Router.extend({
      routes: {
        '/' : 'index'
      },

      initialize: function(){
        console.log('Router - initialized');
        this.userCreate = new UserCreate();
        // this.index();
      },

      index: function() {
        console.log('Index');
      }
    });

    return AppRoute;
  }
);
