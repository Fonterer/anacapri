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
              return "http://localhost/anacapri/api/friends"
            }
        });

        return FriendModel;
    }
);
