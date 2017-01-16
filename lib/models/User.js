function User (username, publicToken, privateToken, repositories) {
    'use strict';

    var _username = username;
    var _publicToken = publicToken;
    var _privateToken = privateToken;
    var _repositories = new Repositories(repositories);

    return {
        get username () {
            return _username;
        },
        set username (username) {
            _username = username;
        },
        get publicToken () {
            return _publicToken;
        },
        set publicToken (publicToken) {
            _publicToken = publicToken;
        },
        get privateToken () {
            return _privateToken;
        },
        set privateToken (privateToken) {
            _privateToken = privateToken;
        },
        get repositories () {
            return _repositories.all;
        },
        set repositories (repositories) {
            _repositories.all = repositories;
        }
    };
}
