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
        window.location.hash = '!/'
        this.index();
      },

      index: function(){
        if(!document.cookie.match('anacapri')){
          return false;
        }

        var name = 'anacapri='
        ,     ca = document.cookie.split(';');

        for(var i = 0; i < ca.length; i++){
          var c = ca[i];

          while (c.charAt(0) == ' '){
            c = c.substring(1);
          }

          if(c.indexOf(name) == 0){
            var d = c.substring(name.length, c.length),
                e = d.split('&');

            console.log('I: ' + e[2] + ' | M: ' + e[1]);
          }
        }

        this.userView = new UserView();
        this.friendView = new FriendView();
      }
    });

    return AppRoute;
  }
);
