angular.module('travis-wall')
    .factory('TravisApi', function ($http) {
        'use strict';

        var TRAVIS_ORG_URL = 'https://api.travis-ci.org';
        var TRAVIS_COM_URL = 'https://api.travis-ci.com';

        function _createUrl (user, type, baseUrl) {
            return baseUrl + '/repos?' + type + '=' + user.username;
        }

        function _createHeaders (user, baseUrl) {
            var token = null;

            if (baseUrl === TRAVIS_ORG_URL) {
                token = user.publicToken;
            }

            if (baseUrl === TRAVIS_COM_URL) {
                token = user.privateToken;
            }

            var headers  = {};

            if (token !== null) {
                headers.Authorization = 'token ' + token;
            }

            return headers;
        }

        function _createRequest (user, type, baseUrl) {
            return $http({
                url: _createUrl(user, type, baseUrl),
                headers: _createHeaders(user, baseUrl)
            });
        }

        function _createRequestByOwner (user, baseUrl) {
            return _createRequest(user, 'owner_name', baseUrl);
        }

        function _createRequestByMember (user, baseUrl) {
            return _createRequest(user, 'member', baseUrl);
        }

        return {
            getByOwnerForOrg: function (user) {
                return _createRequestByOwner(user, TRAVIS_ORG_URL);
            },
            getByMemberForOrg: function (user) {
                return _createRequestByMember(user, TRAVIS_ORG_URL);
            },
            getByOwnerForCom: function (user) {
                return _createRequestByOwner(user, TRAVIS_COM_URL);
            },
            getByMemberForCom: function (user) {
                return _createRequestByMember(user, TRAVIS_COM_URL);
            }
        };
    });
