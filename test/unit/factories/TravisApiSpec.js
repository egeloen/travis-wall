describe('TravisApiSpec', function () {
    'use strict';

    var _travisApi;
    var _user;

    beforeEach(function () {
        module('travis-wall');

        module(function ($provide) {
            $provide.value('$http', function (value) {
                return value;
            });
        });

        inject(function (TravisApi) {
            _travisApi = TravisApi;
        });

        _user = { username: 'foo' };
    });

    describe('API for public account', function () {
        beforeEach(function () {
            _user.publicToken = 'bar';
        });

        it('should define the HTTP request for querying repositories by owner', function () {
            var request = _travisApi.getByOwnerForOrg(_user);

            expect(request.headers.Authorization).toBe('token bar');
            expect(request.url).toBe('https://api.travis-ci.org/repos?owner_name=foo');
        });

        it('should define the HTTP request for querying repositories by member', function () {
            var request = _travisApi.getByMemberForOrg(_user);

            expect(request.headers.Authorization).toBe('token bar');
            expect(request.url).toBe('https://api.travis-ci.org/repos?member=foo');
        });
    });

    describe('API for private account', function () {
        beforeEach(function () {
            _user.privateToken = 'bar';
        });

        it('should define the HTTP request for querying repositories by owner', function () {
            var request = _travisApi.getByOwnerForCom(_user);

            expect(request.headers.Authorization).toBe('token bar');
            expect(request.url).toBe('https://api.travis-ci.com/repos?owner_name=foo');
        });

        it('should define the HTTP request for querying repositories by member', function () {
            var request = _travisApi.getByMemberForCom(_user);

            expect(request.headers.Authorization).toBe('token bar');
            expect(request.url).toBe('https://api.travis-ci.com/repos?member=foo');
        });
    });
});
