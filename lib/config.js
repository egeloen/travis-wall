angular.module('travis-wall')
    .config(function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'partials/home.html'
            })
            .when('/:username', {
                controller: 'WallController',
                templateUrl: 'partials/wall.html'
            });
    });
