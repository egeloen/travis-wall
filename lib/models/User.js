function User (username, token, repositories) {
    'use strict';

    if (username === undefined) {
        username = '';
    }

    if (token === undefined) {
        token = '';
    }

    var _username = username;
    var _token = token;
    var _repositories = new Repositories(repositories);

    return {
        get username () {
            return _username;
        },
        set username (username) {
            _username = username;
        },
        get token () {
            return _token;
        },
        set token (token) {
            _token = token;
        },
        get repositories () {
            return _repositories.all;
        },
        set repositories (repositories) {
            _repositories.all = repositories;
        }
    };
}
