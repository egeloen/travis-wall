describe('UserSpec', function () {
    'use strict';

    var _user;
    var _username;
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
        _repositories = _createCollection();
        _user = new User(_username, _repositories);
    });

    it('should be able to get the username', function () {
        expect(_user.username).toBe(_username);
    });

    it('should be able to set the username', function () {
        _user.username = 'bar';

        expect(_user.username).toBe('bar');
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
