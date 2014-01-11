describe('TravisRepositorySpec', function () {
    'use strict';

    var _travisRepository;
    var _httpBackend;

    function _createData () {
        return [ { slug: 'user/repository-1' }, { slug: 'user/repository-2' } ];
    }

    beforeEach(function () {
        module('travis-wall');

        inject(function (TravisRepository, $httpBackend) {
            _travisRepository = TravisRepository;
            _httpBackend = $httpBackend;
        });
    });

    afterEach(function() {
        _httpBackend.verifyNoOutstandingExpectation();
        _httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to get repositories by owner', function () {
        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?owner_name=foo')
            .respond(_createData());

        _travisRepository
            .getByOwner('foo')
            .then(function (repositories) {
                expect(repositories).toEqual(_createData());
            });

        _httpBackend.flush();
    });

    it('should be able to get repositories by member', function () {
        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?member=foo')
            .respond(_createData());

        _travisRepository
            .getByMember('foo')
            .then(function (repositories) {
                expect(repositories).toEqual(_createData());
            });

        _httpBackend.flush();
    });

    it('should be able to get repositories (starting by member)', function () {
        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?member=foo')
            .respond(_createData());

        _travisRepository
            .get('foo')
            .then(function (repositories) {
                expect(repositories).toEqual(_createData());
            });

        _httpBackend.flush();
    });

    it('should be able to get repositories (fallback on owner if there is no repos for the member)', function () {
        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?member=foo')
            .respond([]);

        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?owner_name=foo')
            .respond(_createData());

        _travisRepository
            .get('foo')
            .then(function (repositories) {
                expect(repositories).toEqual(_createData());
            });

        _httpBackend.flush();
    });
});
