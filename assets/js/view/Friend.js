define(
    'view/friend',
    [
        'jquery',
        'backbone',
        'model/friend'
    ],
    function ($, Backbone, FriendModel) {
        'use strict';

        var FriendView = Backbone.View.extend({
            el: '.friends',

            events: {
                'submit': 'inviteFriend'
            },

            initialize: function(){
                console.log('Friend - initialized');
                this.friend = new FriendModel();
            },

            inviteFriend: function(e){
                var fieldsForm = {
                    'id'        : null,
                    'id_friend' : '17',
                    'name'      : this.$('[name="friend-name"]').val(),
                    'email'     : this.$('[name="friend-email"]').val()
                };

                this.friend.save(fieldsForm, {
                    error: function(data){
                        console.log('Error - ' + data);
                    },
                    success: function(data){
                        alert('Amigo convidado com sucesso');

                        // TO DO - create a method
                        $('.an-input').each(function( index ) {
                            $(this).val('');
                        });

                        // TO DO - create a method
                        // $('.an-invite').removeClass('hide');

                        setTimeout(function(){
                            $('html, body').animate({scrollTop: $('.an-footer').offset().top}, 'slow');
                            window.location.hash = 'polaroid'
                        }, 1000);
                    }
                });

                e.preventDefault();
            }
        });

        return FriendView;
    }
);
