define(
    'view/userCreate',
    [
        'jquery',
        'backbone'
    ],
    function ($, Backbone) {
        'use strict';

        var UserCreate = Backbone.View.extend({
            el: '.an-form',

            events: {
                'submit': 'userCreate'
            },

            initialize: function(){
                console.log('userCreate - initialized');
            },

            userCreate: function(e){
                var fieldsForm = {
                    "id"   : " ",
                    "name" : this.$('[name="name"]').val(),
                    "email": this.$('[name="email"]').val()
                }

                console.log(fieldsForm);
                alert(fieldsForm);

                e.preventDefault();
            }
        });

        return UserCreate;
    }
);
