define(
    'view/friend',
    [
        'jquery',
        'backbone',
        'model/friend',
        'view/ui'
    ],
    function ($, Backbone, FriendModel, Ui) {
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
                this.ui = new Ui();
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

            showInviteConfirmation: function(){
                this.ui.showOverlay();
                this.$('.an-invites').removeClass('hide');
            },

            hideInviteConfirmation: function(e){
                this.ui.hideOverlay();
                this.ui.gotoSection('footer', 'descomplique');
                this.$('.an-invites').addClass('hide');

                e.preventDefault();
            },

            inviteFriend: function(e){
                var $this = this;
                var fieldsForm = {
                    'id'        : null,
                    'id_friend' : this.$('[name="friend-id"]').val(),
                    'name'      : this.$('[name="friend-name"]').val(),
                    'email'     : this.$('[name="friend-email"]').val()
                };

                this.ui.showLoader();
                this.friend.save(fieldsForm, {
                    error: function(data){
                        $this.ui.hideLoader();
                        alert('Ops... Um erro ocorreu!');
                        console.log('Error - ' + data);
                    },
                    success: function(){
                        $this.ui.hideLoader();
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
