define(
  'route/app',
  [
    'jquery',
    'backbone',
    'view/ui',
    'view/user',
    'view/friend'
  ],
  function($, Backbone, Ui, UserView, FriendView){
    'use strict';

    var AppRoute = Backbone.Router.extend({
      routes: {
        '/anacapri' : 'index'
      },

      initialize: function(){
        this.index();
      },

      index: function(){
        window.location.hash = '!/';

        this.friendView = new FriendView();
        this.userView = new UserView();
        this.ui = new Ui();
        this.ui.getCookie();
      }
    });

    return AppRoute;
  }
);
