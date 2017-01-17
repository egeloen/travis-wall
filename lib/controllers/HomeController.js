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

                    if (user.publicToken) {
                        $location.search('public-token', user.publicToken);
                    }

                    if (user.privateToken) {
                        $location.search('private-token', user.privateToken);
                    }

                    $location.path('/' + user.username);
                });
        };
    });
