define(
    'model/user',
    [
        'backbone',
    ],
    function (Backbone) {
        'use strict';

        var UserModel = Backbone.Model.extend({
            // getUserName: function() {
            //     return this.get('name');
            // },

            // getUserEmail: function() {
            //     return this.get('email');
            // }

            defaults: {
                name: '',
                email: ''
            },

            url: function(){
              return "http://localhost/anacapri/api/users"
            },
        });

        return UserModel;
    }
);
