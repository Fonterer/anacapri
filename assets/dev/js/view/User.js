define(
    'view/user',
    [
        'jquery',
        'backbone',
        'model/user',
        'view/ui'
    ],
    function ($, Backbone, UserModel, Ui)
    {
        'use strict';

        var UserView = Backbone.View.extend({
            el: '.an-signup',

            events: {
                'submit .create'   : 'createUser',
                'submit .signin'   : 'findByEmail',
                'click .an-signin' : 'showLogin',
                'click .an-close'  : 'hideLogin',
                'click .an-logout' : 'deleteCookie'
            },

            initialize: function() {
                this.user = new UserModel();
                this.ui = new Ui();
                this.urlRoot = window.location.origin + window.location.pathname;
            },

            resetForm: function(context) {
                context.$('.an-input').each(function(){
                    $(this).val('');
                });
            },

            createUser: function(e) {
                if (this.$('[name="spider"]').val() != '') return false;

                var $this = this;
                var fieldsForm = {
                    'id'   : null,
                    'name' : this.$('[name="name"]').val(),
                    'email': this.$('[name="email"]').val()
                };

                this.ui.showLoader();
                this.user.save(fieldsForm, {
                    error: function(data){
                        $this.ui.hideLoader();

                        alert('Ops... Um erro ocorreu!');
                        console.log('Error - ' + data);
                    },
                    success: function(data){
                        var obj = data.attributes;

                        $this.resetForm($this);
                        $this.ui.hideLoader();
                        $this.ui.createCookie(obj.id, obj.name);
                        $this.ui.setIdFriend(obj.id);
                        $this.ui.hideCreateForm();
                        $this.ui.showWelcomeBlock(obj.name);
                        $this.ui.gotoSection('content', 'convide');
                        $this.ui.disabledForm();
                    }
                });

                e.preventDefault();
            },

            findByEmail: function(e) {
                if (this.$('[name="spider_f"]').val() != '') return false;

                var $this = this
                ,   email = this.$('[name="login-email"]').val();

                this.ui.showLoader();

                Backbone.ajax({
                    type: 'GET',
                    url: this.urlRoot + 'api/users/search/' + email,
                    dataType: 'json'
                })
                .done(function(data) {
                    var obj = data[0];

                    $this.hideLogin();
                    $this.resetForm($this);

                    $this.ui.hideLoader();
                    $this.ui.createCookie(obj.id, obj.name);
                    $this.ui.setIdFriend(obj.id);
                    $this.ui.hideCreateForm();
                    $this.ui.showWelcomeBlock(obj.name);
                    $this.ui.gotoSection('content', 'convide');
                    $this.ui.disabledForm();
                })
                .error(function(data) {
                    $this.ui.hideLoader();

                    alert('Ops... Um erro ocorreu!');
                    console.log('Error - ' + data);
                });

                e.preventDefault();
            },

            showLogin: function(e) {
                this.ui.showOverlay();
                this.$el.find('.an-login').removeClass('hide');

                e.preventDefault();
            },

            hideLogin: function(e) {
                this.ui.hideOverlay();
                this.$el.find('input[type=text]').val('');
                this.$el.find('.an-login').addClass('hide');

                if(e){
                    e.preventDefault();
                }
            },

            deleteCookie: function() {
                document.cookie = "anacapri=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                this.ui.hideWelcomeBlock();
                this.ui.showCreateForm();
            }
        });

        return UserView;
    }
);
