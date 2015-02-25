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
        return window.location.origin +
               window.location.pathname + 'api/users';
      }
    });

    return UserCollection;
  }
);
