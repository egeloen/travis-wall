angular.module('travis-wall')
    .controller('HomeController', function ($scope, $location, TravisRepository) {
        'use strict';

        $scope.user = new User();

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
