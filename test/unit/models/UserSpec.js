describe('UserSpec', function () {
    'use strict';

    var _user;
    var _username;
    var _token;
    var _repositories;

    function _createData (slug) {
        return {
            id: 123,
            slug: slug
        };
    }

    function _createCollection () {
        return [ _createData('foo'), _createData('bar') ];
    }

    beforeEach(function () {
        _username = 'foo';
        _token = 'bar';
        _repositories = _createCollection();
        _user = new User(_username, _token, _repositories);
    });

    it('should be able to init an empty user', function () {
        _user = new User();

        expect(_user.username).toBe('');
        expect(_user.token).toBe('');
        expect(_user.repositories.length).toBe(0);
    });

    it('should be able to get the username', function () {
        expect(_user.username).toBe(_username);
    });

    it('should be able to set the username', function () {
        _user.username = 'bar';

        expect(_user.username).toBe('bar');
    });

    it('should be able to get the token', function () {
        expect(_user.token).toBe(_token);
    });

    it('should be able to set the username', function () {
        _user.token = 'foo';

        expect(_user.token).toBe('foo');
    });

    it('should be able to get the repositories', function () {
        expect(_user.repositories.length).toBe(_repositories.length);
    });

    it('should be able to set the repositories', function () {
        var repositories = _createCollection();
        repositories.push(_createData('baz'));

        _user.repositories = repositories;

        expect(_user.repositories.length).toBe(repositories.length);
    });
});
