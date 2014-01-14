angular.module('travis-wall')
    .factory('TravisRepository', function ($q, TravisApi) {
        'use strict';

        function _getForOrg (user) {
            return _getByMemberForOrg(user).then(function (repositories) {
                if (repositories.length) {
                    return repositories;
                }

                return _getByOwnerForOrg(user);
            });
        }

        function _getForCom (user) {
            return _getByMemberForCom(user).then(function (repositories) {
                if (repositories.length) {
                    return repositories;
                }

                return _getByOwnerForCom(user);
            });
        }

        function _getByMemberForOrg (user) {
            var _deferred = $q.defer();

            TravisApi
                .getByMemberForOrg(user)
                .success(function (repositories) {
                    _deferred.resolve(_setPrivate(repositories, false));
                })
                .error(function (error) {
                    _deferred.reject(error);
                });

            return _deferred.promise;
        }

        function _getByOwnerForOrg (user) {
            var _deferred = $q.defer();

            TravisApi
                .getByOwnerForOrg(user)
                .success(function (repositories) {
                    _deferred.resolve(_setPrivate(repositories, false));
                })
                .error(function (error) {
                    _deferred.reject(error);
                });

            return _deferred.promise;
        }

        function _getByMemberForCom (user) {
            var _deferred = $q.defer();

            TravisApi
                .getByMemberForCom(user)
                .success(function (repositories) {
                    _deferred.resolve(_setPrivate(repositories, true));
                })
                .error(function (error) {
                    _deferred.reject(error);
                });

            return _deferred.promise;
        }

        function _getByOwnerForCom (user) {
            var _deferred = $q.defer();

            TravisApi
                .getByOwnerForCom(user)
                .success(function (repositories) {
                    _deferred.resolve(_setPrivate(repositories, true));
                })
                .error(function (error) {
                    _deferred.reject(error);
                });

            return _deferred.promise;
        }

        function _setPrivate (repositories, value) {
            for (var key in repositories) {
                repositories[key].private = value;
            }

            return repositories;
        }

        return {
            get: function (user) {
                return _getForOrg(user).then(function (orgRepositories) {
                    if (user.token === '') {
                        return orgRepositories;
                    }

                    return _getForCom(user, orgRepositories).then(function (comRepositories) {
                        return orgRepositories.concat(comRepositories);
                    });
                });
            }
        };
    });
