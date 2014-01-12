angular.module('travis-wall')
    .factory('UserManager', function () {
        var _user = new User();

        return {
            get user () {
                return _user;
            }
        };
    });
