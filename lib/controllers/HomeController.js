angular.module('travis-wall')
    .controller('HomeController', function ($scope, $location, UserManager, TravisRepository) {
        'use strict';

        $scope.user = UserManager.user;

        $scope.login = function () {
            TravisRepository
                .get($scope.user.username)
                .then(function (repositories) {
                    if (repositories.length) {
                        $location.path('/' + $scope.user.username);
                    }
                });
        };
    });
