angular.module('travis-wall')
    .controller('WallController', function ($scope, $routeParams, $interval, $location, TravisRepository) {
        'use strict';

        $scope.user = new User($routeParams.username, $routeParams['public-token'], $routeParams['private-token']);

        var _redirect = function () {
            $location.search('public-token', null);
            $location.search('private-token', null);
            $location.path('/');
        };

        var _wall = function () {
            TravisRepository
                .get($scope.user)
                .then(function (repositories) {
                    if (!repositories.length) {
                        _redirect();
                    }

                    $scope.user.repositories = repositories;
                }, _redirect);
        };

        _wall();

        var _interval = $interval(_wall, 15000);

        $scope.$on('$destroy', function () {
            $interval.cancel(_interval);
        });
    });
