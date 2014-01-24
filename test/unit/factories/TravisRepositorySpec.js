describe('TravisRepositorySpec', function () {
    'use strict';

    var _travisRepository;
    var _user;
    var _httpBackend;

    function _createData () {
        return [ { slug: 'user/repository-1' }, { slug: 'user/repository-2' } ];
    }

    function _createBuildedData (value) {
        var _data = _createData();

        for (var key in _data) {
            _data[key].private = value;
        }

        return _data;
    }

    beforeEach(function () {
        module('travis-wall');

        _user = {
            username: 'foo',
            token: ''
        };

        inject(function (TravisRepository, $httpBackend) {
            _travisRepository = TravisRepository;
            _httpBackend = $httpBackend;
        });
    });

    afterEach(function() {
        _httpBackend.verifyNoOutstandingExpectation();
        _httpBackend.verifyNoOutstandingRequest();
    });

    describe('API for public account', function () {
        it('should be able to get repositories (starting by member)', function () {
            _httpBackend
                .when('GET', 'https://api.travis-ci.org/repos?member=foo')
                .respond(_createData());

            _travisRepository
                .get(_user)
                .then(function (repositories) {
                    expect(repositories).toEqual(_createBuildedData(false));
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
                .get(_user)
                .then(function (repositories) {
                    expect(repositories).toEqual(_createBuildedData(false));
                });

            _httpBackend.flush();
        });
    });

    describe('API for public/private account', function () {
        beforeEach(function () {
            _user.token = 'bar';
        });

        it('should be able to get repositories (starting by member)', function () {
            _httpBackend
                .when('GET', 'https://api.travis-ci.org/repos?member=foo')
                .respond(_createData());

            _httpBackend
                .when('GET', 'https://api.travis-ci.com/repos?member=foo', { Authorization: 'token bar' })
                .respond(_createData());

            _travisRepository
                .get(_user)
                .then(function (repositories) {
                    expect(repositories).toEqual(_createBuildedData(false).concat(_createBuildedData(true)));
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

            _httpBackend
                .when('GET', 'https://api.travis-ci.com/repos?member=foo', { Authorization: 'token bar' })
                .respond([]);

            _httpBackend
                .when('GET', 'https://api.travis-ci.com/repos?owner_name=foo', { Authorization: 'token bar' })
                .respond(_createData());

            _travisRepository
                .get(_user)
                .then(function (repositories) {
                    expect(repositories).toEqual(_createBuildedData(false).concat(_createBuildedData(true)));
                });

            _httpBackend.flush();
        });
    });
});
