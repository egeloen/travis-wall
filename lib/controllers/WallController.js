angular.module('travis-wall')
    .controller('WallController', function ($scope, $routeParams, $interval, $location, TravisRepos) {
        $scope.user = new User($routeParams.username);

        var _callback = function () {
            TravisRepos
                .get($scope.user.username)
                .then(function (repositories) {
                    if (!repositories.length) {
                        $location.path('/');
                    }

                    $scope.user.repositories.all = repositories;
                });
        };

        _callback();

        var _interval = $interval(_callback, 15000);

        $scope.$on('$destroy', function () {
            $interval.cancel(_interval);
        });
    });
