define(
  'route/app',
  [
    'jquery',
    'backbone',
    'view/user'
  ],
  function($, Backbone, UserView){
    'use strict';

    var AppRoute = Backbone.Router.extend({
      routes: {
        '/' : 'index'
      },

      initialize: function(){
        console.log('Router - initialized');
        this.index();
      },

      index: function() {
        this.userView = new UserView();
      }
    });

    return AppRoute;
  }
);
