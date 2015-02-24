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
        '/anacapri' : 'index'
      },

      initialize: function(){
        this.index();
      },

      index: function(){
        window.location.hash = '!/'

        this.friendView = new FriendView();
        this.userView = new UserView();
        this.userView.getCookie();
      }
    });

    return AppRoute;
  }
);
