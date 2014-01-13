angular.module('travis-wall')
    .controller('WallController', function ($scope, $routeParams, $interval, $location, TravisRepository) {
        'use strict';

        $scope.user = new User($routeParams.username, $routeParams.token);

        var _wall = function () {
            TravisRepository
                .get($scope.user)
                .then(function (repositories) {
                    if (!repositories.length) {
                        $location.path('/');
                    }

                    $scope.user.repositories = repositories;
                });
        };

        _wall();

        var _interval = $interval(_wall, 15000);

        $scope.$on('$destroy', function () {
            $interval.cancel(_interval);
        });
    });
