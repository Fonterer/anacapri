define(
    'view/user',
    [
        'jquery',
        'backbone',
        'model/user'
    ],
    function ($, Backbone, UserModel) {
        'use strict';

        var UserView = Backbone.View.extend({
            el: '.an-form',

            events: {
                'submit': 'userCreate'
            },

            initialize: function(){
                console.log('User - initialized');
                this.user = new UserModel();
            },

            userCreate: function(e){
                var fieldsForm = {
                    "name" : this.$('[name="name"]').val(),
                    "email": this.$('[name="email"]').val()
                };

                this.user.save(fieldsForm, {
                    error: function(data){
                        console.log('Error - ' + data);
                    },
                    success: function(data){
                        console.log('Success - ' + data);
                    }
                });
                e.preventDefault();
            }
        });

        return UserView;
    }
);
