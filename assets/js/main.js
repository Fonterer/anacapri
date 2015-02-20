'use strict';

require.config({
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        spin: {
            exports: 'spin'
        }
    },
    paths: {
        jquery     : '../vendor/jquery/jquery',
        underscore : '../vendor/underscore/underscore',
        backbone   : '../vendor/backbone/backbone',
        spin       : '../vendor/spinjs/spin'
    }
});

require(
    [
        'backbone',
        'route/app'
    ],
    function (Backbone, Router) {
        var router = new Router(function(){
            Backbone.history.start({'pushState' : false, 'hashChange' : true});
        });
    }
);
