function User (username, repositories) {
    'use strict';

    if (username === undefined) {
        username  = '';
    }

    var _username = username;
    var _repositories = new Repositories(repositories);

    return {
        get username () {
            return _username;
        },
        set username (username) {
            _username = username;
        },
        get repositories () {
            return _repositories.all;
        },
        set repositories (repositories) {
            _repositories.all = repositories;
        }
    };
}
