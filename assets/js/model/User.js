define(
    'model/user',
    [
        'backbone',
    ],
    function (Backbone) {
        'use strict';

        var UserModel = Backbone.Model.extend({
            defaults: {
                name: '',
                email: ''
            },

            url: function(){
              return "http://localhost/anacapri/api/users"
            }
        });

        return UserModel;
    }
);
