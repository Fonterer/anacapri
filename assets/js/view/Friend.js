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
                'blur input' : 'disabledSubmit',
                'submit'     : 'inviteFriend'
            },

            initialize: function(){
                this.friend = new FriendModel();
            },

            resetForm: function(context){
                context.$('.an-input').each(function(){
                    $(this).val('');
                });
            },

            disabledSubmit: function(){
                var name = this.$('[name="friend-name"]').val()
                ,  email = this.$('[name="friend-email"]').val();

                if (name != '' && email != '') {
                    console.log('Háaaa!!!');
                };
            },

            inviteFriend: function(e){
                var $this = this;
                var fieldsForm = {
                    'id'        : null,
                    'id_friend' : this.$('[name="friend-id"]').val(),
                    'name'      : this.$('[name="friend-name"]').val(),
                    'email'     : this.$('[name="friend-email"]').val()
                };

                this.friend.save(fieldsForm, {
                    error: function(data){
                        console.log('Error - ' + data);
                    },
                    success: function(data){
                        alert('Amigo convidado com sucesso');

                        $this.resetForm($this);

                        // TO DO - create a method
                        // $('.an-invite').removeClass('hide');

                        setTimeout(function(){
                            $('html, body').animate({scrollTop: $('.an-footer').offset().top}, 'slow');
                            window.location.hash = '!/descomplique'
                        }, 1000);
                    }
                });

                e.preventDefault();
            }
        });

        return FriendView;
    }
);
