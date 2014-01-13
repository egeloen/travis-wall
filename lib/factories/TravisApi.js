angular.module('travis-wall')
    .factory('TravisApi', function ($http) {
        'use strict';

        var TRAVIS_ORG_URL = 'https://api.travis-ci.org';
        var TRAVIS_COM_URL = 'https://api.travis-ci.com';

        function _createHttp (user, type, token) {
            var headers = {};

            if (token) {
                headers.Authorization = 'token ' + user.token;
            }

            return $http({
                method: 'GET',
                headers: headers,
                url: (token ? TRAVIS_COM_URL : TRAVIS_ORG_URL) + '/repos?' + type + '=' + user.username
            });
        }

        function _createHttpByOwner (user, token) {
            return _createHttp(user, 'owner_name', token);
        }

        function _createHttpByMember (user, token) {
            return _createHttp(user, 'member', token);
        }

        return {
            getByOwnerForOrg: function (user) {
                return _createHttpByOwner(user, false);
            },
            getByMemberForOrg: function (user) {
                return _createHttpByMember(user, false);
            },
            getByOwnerForCom: function (user) {
                return _createHttpByOwner(user, true);
            },
            getByMemberForCom: function (user) {
                return _createHttpByMember(user, true);
            }
        };
    });
