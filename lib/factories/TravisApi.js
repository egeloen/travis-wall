angular.module('travis-wall')
    .factory('TravisApi', function ($http) {
        'use strict';

        var TRAVIS_REPOS_URL = 'https://api.travis-ci.org/repos';

        return {
            getByOwner: function (owner) {
                return $http({
                    method: 'GET',
                    url: TRAVIS_REPOS_URL + '?owner_name=' + owner
                });
            },
            getByMember: function (member) {
                return $http({
                    method: 'GET',
                    url: TRAVIS_REPOS_URL + '?member=' + member
                });
            }
        };
    });
