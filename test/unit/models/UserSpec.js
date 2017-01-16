describe('UserSpec', function () {
    'use strict';

    var _user;
    var _username;
    var _publicToken;
    var _privateToken;
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
        _publicToken = 'bar';
        _privateToken = 'baz';
        _repositories = _createCollection();
        _user = new User(_username, _publicToken, _privateToken, _repositories);
    });

    it('should be able to init an empty user', function () {
        _user = new User();

        expect(_user.username).toBe(undefined);
        expect(_user.publicToken).toBe(undefined);
        expect(_user.privateToken).toBe(undefined);
        expect(_user.repositories.length).toBe(0);
    });

    it('should be able to get the username', function () {
        expect(_user.username).toBe(_username);
    });

    it('should be able to set the username', function () {
        _user.username = 'bar';

        expect(_user.username).toBe('bar');
    });

    it('should be able to get the public token', function () {
        expect(_user.publicToken).toBe(_publicToken);
    });

    it('should be able to set the public token', function () {
        _user.publicToken = 'foo';

        expect(_user.publicToken).toBe('foo');
    });

    it('should be able to get the private token', function () {
        expect(_user.privateToken).toBe(_privateToken);
    });

    it('should be able to set the private token', function () {
        _user.privateToken = 'foo';

        expect(_user.privateToken).toBe('foo');
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
