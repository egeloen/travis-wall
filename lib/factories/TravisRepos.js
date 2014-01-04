angular.module('travis-wall')
    .factory('TravisRepos', function ($q, TravisApi) {
        return {
            getByMember: function (username) {
                var _deferred = $q.defer();

                TravisApi
                    .getByMember(username)
                    .success(function (repos) {
                        _deferred.resolve(repos);
                    })
                    .error(function (error) {
                        _deferred.error(error);
                    });

                return _deferred.promise;
            },
            getByOwner: function (username) {
                var _deferred = $q.defer();

                TravisApi
                    .getByOwner(username)
                    .success(function (repos) {
                        _deferred.resolve(repos);
                    })
                    .error(function (error) {
                        _deferred.error(error);
                    });

                return _deferred.promise;
            },
            get: function (username) {
                var _that = this;

                return _that.getByMember(username).then(function (repositories) {
                    if (repositories.length) {
                        return repositories;
                    }

                    return _that.getByOwner(username);
                });
            }
        };
    });
