angular.module('travis-wall')
    .factory('UserManager', function () {
        'use strict';

        var _user = new User();

        return {
            get user () {
                return _user;
            }
        };
    });
