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
            el: '.an-signup',

            events: {
                'submit .create'   : 'createUser',
                'submit .signin'   : 'findByEmail',
                'click .an-signin' : 'showLogin',
                'click .an-close'  : 'hideLogin'
            },

            initialize: function(){
                this.user = new UserModel();
            },

            resetForm: function(context){
                context.$('.an-input').each(function(){
                    $(this).val('');
                });
            },

            createCookie: function(id, name){
                var  date = new Date();
                date.setTime(date.getTime() + (30*24*60*60*1000));

                var expires = 'expires=' + date.toGMTString();
                document.cookie = 'anacapri=&' + name + '&' + id + ';' + expires;
            },

            getCookie: function(){
                if(!document.cookie.match('anacapri')){
                  return false;
                }

                var name = 'anacapri='
                ,     ca = document.cookie.split(';');

                for(var i = 0; i < ca.length; i++){
                  var c = ca[i];

                  while (c.charAt(0) == ' '){
                    c = c.substring(1);
                  }

                  if(c.indexOf(name) == 0){
                    var d = c.substring(name.length, c.length),
                        e = d.split('&');

                    console.log('I: ' + e[2] + ' | M: ' + e[1]);

                    $('input[name="friend-id"').val(e[2]);

                    this.hideCreateForm();
                    this.showWelcomeBlock(e[1]);
                    this.gotoSection('content', 'convide');
                    this.disabledForm();
                  }
                }
            },

            hideCreateForm: function(){
                $('.create').addClass('hide');
            },

            showWelcomeBlock: function(name){
                $('.an-welcome span').text(name);
                $('.an-welcome').removeClass('hide');
            },

            createUser: function(e){
                var $this = this;
                var fieldsForm = {
                    'id'   : null,
                    'name' : this.$('[name="name"]').val(),
                    'email': this.$('[name="email"]').val()
                };

                this.user.save(fieldsForm, {
                    error: function(data){
                        console.log('Error - ' + data);
                    },
                    success: function(data){
                        var obj = data.attributes;

                        alert('User criado com sucesso');
                        $this.resetForm($this);
                        $this.createCookie(obj.id, obj.name);
                        $this.hideCreateForm();
                        $this.showWelcomeBlock(obj.name);
                        $this.gotoSection('content', 'convide');
                        $this.disabledForm();
                    }
                });

                e.preventDefault();
            },

            gotoSection: function(section, hash){
                setTimeout(function(){
                    $('html, body').animate({
                        scrollTop: $('.'+section).offset().top
                    }, 'slow');

                    window.location.hash = '!/' + hash;
                }, 1000);
            },

            disabledForm: function(){
                $('.friends .an-input').each(function(){
                    $(this).removeAttr('disabled');
                });
            },

            findByEmail: function(e){
                var $this = this
                ,   email = this.$('[name="login-email"]').val();

                Backbone.ajax({
                    type: 'GET',
                    url: 'http://localhost/anacapri/api/users/search/' + email,
                    dataType: 'json'
                }).done(function(data){
                    var obj = data[0];

                    $this.hideLogin();
                    $this.resetForm($this);
                    $this.createCookie(obj.id, obj.name);
                    $this.hideCreateForm();
                    $this.showWelcomeBlock(obj.name);
                    $this.gotoSection('content', 'convide');
                    $this.disabledForm();
                });

                e.preventDefault();
            },

            showLogin: function(e){
                this.showOverlay();
                this.$el.find('.an-login').removeClass('hide');
                e.preventDefault();
            },

            hideLogin: function(e){
                this.hideOverlay();
                this.$el.find('input[type=text]').val('');
                this.$el.find('.an-login').addClass('hide');

                if(e){
                    e.preventDefault();
                }
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
            }
        });

        return UserView;
    }
);
