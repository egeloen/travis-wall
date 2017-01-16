angular.module('travis-wall')
    .controller('HomeController', function ($scope, $location, TravisRepository) {
        'use strict';

        $scope.user = new User();

        $scope.login = function () {
            TravisRepository
                .get($scope.user)
                .then(function (repositories) {
                    if (!repositories.length) {
                        return;
                    }

                    var user = $scope.user;

                    if (user.publicToken !== undefined) {
                        $location.search('public-token', user.publicToken);
                    }

                    if (user.privateToken !== undefined) {
                        $location.search('private-token', user.privateToken);
                    }

                    $location.path('/' + user.username);
                });
        };
    });
