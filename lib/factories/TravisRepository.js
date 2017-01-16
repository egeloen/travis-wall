angular.module('travis-wall')
    .factory('TravisRepository', function ($q, TravisApi) {
        'use strict';

        function _getForOrg (user) {
            return $q.all({member: _getByMemberForOrg(user), owner: _getByOwnerForOrg(user)})
                .then(function (results) {
                    return results.member.concat(results.owner);
                })
                .catch(function () {
                    return [];
                });
        }

        function _getForCom (user) {
            return $q.all({member: _getByMemberForCom(user), owner: _getByOwnerForCom(user)})
                .then(function (results) {
                    return results.member.concat(results.owner);
                })
                .catch(function () {
                    return [];
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
                var orgUser = user.publicToken !== undefined;
                var comUser = user.privateToken !== undefined;

                if (orgUser && comUser) {
                    return $q.all({org: _getForOrg(user), com: _getForCom(user)})
                        .then(function (results) {
                            return results.org.concat(results.com);
                        })
                        .catch(function () {
                            return [];
                        });
                }

                if (orgUser) {
                    return _getForOrg(user)
                        .then(function (repositories) {
                            return repositories;
                        })
                        .catch(function () {
                            return [];
                        });
                }

                if (comUser) {
                    return _getForCom(user)
                        .then(function (repositories) {
                            return repositories;
                        })
                        .catch(function () {
                            return [];
                        });
                }

                var _deferred = $q.defer();
                _deferred.resolve([]);

                return _deferred.promise;
            }
        };
    });
