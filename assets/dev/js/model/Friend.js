define(
    'model/friend',
    [
        'backbone',
    ],
    function (Backbone) {
        'use strict';

        var FriendModel = Backbone.Model.extend({
            defaults: {
                id_friend : '',
                name      : '',
                email     : ''
            },

            url: function(){
              return window.location.origin +
                     window.location.pathname + 'api/friends';
            }
        });

        return FriendModel;
    }
);
