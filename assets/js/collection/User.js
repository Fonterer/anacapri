define(
  'collection/user',
  [
    'backbone',
    'model/user'
  ],
  function (Backbone, UserModel) {
    'use strict';

    var UserCollection = Backbone.Collection.extend({
      model: UserModel,

      url: function(){
        return "http://localhost/anacapri/api/users"
      },

      initialize: function(){
        console.log('Collection - initialized');
      }
    });

    return UserCollection;
  }
);
