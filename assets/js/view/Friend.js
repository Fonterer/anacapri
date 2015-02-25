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
                'keyup input'  : 'disabledSubmit',
                'submit'       : 'inviteFriend',
                'click .close' : 'hideInviteConfirmation'
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
                    this.$('[type="submit"]').removeAttr('disabled');
                }
            },

            gotoSection: function(section, hash){
                setTimeout(function(){
                    $('html, body').animate({
                        scrollTop: $('.'+section).offset().top
                    }, 'slow');

                    window.location.hash = '!/' + hash;
                }, 1000);
            },

            showInviteConfirmation: function(){
                this.showOverlay();
                this.$('.an-invites').removeClass('hide');
            },

            hideInviteConfirmation: function(e){
                this.hideOverlay();
                this.gotoSection('footer', 'descomplique');
                this.$('.an-invites').addClass('hide');

                e.preventDefault();
            },

            showOverlay: function(){
                this.blockView();
                $('.an-overlay').removeClass('hide');
            },

            hideOverlay: function(){
                this.unblockView();
                $('.an-overlay').addClass('hide');
            },

            blockView: function(){
                $('body').addClass('overflow');
            },

            unblockView: function(){
                $('body').removeClass('overflow');
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
                        $this.showInviteConfirmation();
                    }
                });

                e.preventDefault();
            }
        });

        return FriendView;
    }
);
