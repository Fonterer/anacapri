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
                    "id"   : null,
                    "name" : this.$('[name="name"]').val(),
                    "email": this.$('[name="email"]').val()
                };

                this.user.save(fieldsForm, {
                    error: function(data){
                        console.log('Error - ' + data);
                    },
                    success: function(data){
                        alert('User criado com sucesso');

                        // TO DO - create a method
                        $('.an-input').each(function( index ) {
                            $(this).val('');
                        });

                        // TO DO - create a method
                        var  date = new Date()
                        date.setTime(date.getTime() + (30*24*60*60*1000));

                        var expires = "expires=" + date.toGMTString();
                        document.cookie = "anacapri=true; " + expires;
                    }
                });

                e.preventDefault();
            }
        });

        return UserView;
    }
);
