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
        }
    },
    paths: {
        jquery     : '../../vendor/jquery/jquery.min',
        underscore : '../../vendor/underscore/underscore-min',
        backbone   : '../../vendor/backbone/backbone-min'
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

        return router;
    }
)
