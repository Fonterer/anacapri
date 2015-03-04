define(
    'view/ui',
    [
        'jquery',
        'backbone'
    ],
    function ($, Backbone) {
        'use strict';

        var UiView = Backbone.View.extend({
            el: 'body',

            initialize: function(){
                // console.log('UiView');
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

                    // console.log('I: ' + e[2] + ' | M: ' + e[1]);

                    $('.abc').val(e[2]);

                    this.hideCreateForm();
                    this.showWelcomeBlock(e[1]);
                    this.gotoSection('content', 'convide');
                    this.disabledForm();
                  }
                }
            },

            showCreateForm: function(){
                $('.create').removeClass('hide');
            },

            hideCreateForm: function(){
                $('.create').addClass('hide');
            },

            showWelcomeBlock: function(name){
                $('.an-welcome span').text(name);
                $('.an-welcome').removeClass('hide');
            },

            hideWelcomeBlock: function(){
                $('.an-welcome span').text('');
                $('.an-welcome').addClass('hide');
            },

            disabledForm: function(){
                $('.friends .an-input').each(function(){
                    $(this).removeAttr('disabled');
                });
            },

            showLoader: function(){
                $('.an-modal').addClass('open');
            },

            hideLoader: function(){
                $('.an-modal').removeClass('open');
            },

            gotoSection: function(section, hash){
                setTimeout(function(){
                    $('html, body').animate({
                        scrollTop: $('.'+section).offset().top
                    }, 'slow');

                    window.location.hash = '!/' + hash;
                }, 1000);
            },

            setIdFriend: function(id){
                $('.abc').val(id);
            },

            showOverlay: function(){
                $('.an-overlay').removeClass('hide');
            },

            hideOverlay: function(){
                $('.an-overlay').addClass('hide');
            }
        });

        return UiView;
    }
);
