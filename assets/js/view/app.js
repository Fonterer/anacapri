define(
    'view/app',
    [
        'jquery',
        'backbone'
    ],
    function ($, Backbone) {
        'use strict';

        var AppView = Backbone.View.extend({
            initialize: function() {
                console.log('hello there, i am here!');
            }
        });

        return AppView;
    }
);
