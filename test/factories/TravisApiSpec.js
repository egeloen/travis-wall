describe('TravisApiSpec', function () {
    'use strict';

    var _travisApi;

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
    });

    it('should define the HTTP request for querying repositories by owner', function () {
        var request = _travisApi.getByOwner('foo');

        expect(request.method).toBe('GET');
        expect(request.url).toBe('https://api.travis-ci.org/repos?owner_name=foo');
    });

    it('should define the HTTP request for querying repositories by member', function () {
        var request = _travisApi.getByMember('foo');

        expect(request.method).toBe('GET');
        expect(request.url).toBe('https://api.travis-ci.org/repos?member=foo');
    });
});
