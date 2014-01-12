angular.module('travis-wall')
    .controller('WallController', function ($scope, $routeParams, $interval, $location, UserManager, TravisRepository) {
        'use strict';

        $scope.user = UserManager.user;
        $scope.user.username = $routeParams.username;

        var _wall = function () {
            TravisRepository
                .get($scope.user.username)
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
