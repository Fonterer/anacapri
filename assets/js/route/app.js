define(
  'route/app',
  [
    'jquery',
    'backbone',
    'view/user',
    'view/friend'
  ],
  function($, Backbone, UserView, FriendView){
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
        this.friendView = new FriendView();
      }
    });

    return AppRoute;
  }
);
