angular.module('travis-wall')
    .controller('HomeController', function ($scope, $location, TravisRepos) {
        $scope.user = new User();

        $scope.login = function () {
            TravisRepos
                .get($scope.user.username)
                .then(function (repositories) {
                    if (repositories.length) {
                        $location.path('/' + $scope.user.username);
                    }
                });
        };
    });
