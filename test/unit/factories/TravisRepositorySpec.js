describe('TravisRepositorySpec', function () {
    'use strict';

    var _travisRepository;
    var _user;
    var _httpBackend;

    function _createData () {
        return [
            { slug: 'user/repository-1' },
            { slug: 'user/repository-2' }
        ];
    }

    function _createPrivateData (value) {
        var _data = _createData();

        for (var key in _data) {
            _data[key].private = value;
        }

        return _data;
    }

    beforeEach(function () {
        module('travis-wall');

        _user = { username: 'foo' };

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
        beforeEach(function () {
            _user.publicToken = 'bar';
        });

        it('should be able to get repositories', function () {
            _httpBackend
                .when('GET', 'https://api.travis-ci.org/repos?member=foo', { Authorization: 'token bar' })
                .respond(_createData());

            _httpBackend
                .when('GET', 'https://api.travis-ci.org/repos?owner_name=foo', { Authorization: 'token bar' })
                .respond(_createData());

            _travisRepository
                .get(_user)
                .then(function (repositories) {
                    expect(repositories).toEqual(_createPrivateData(false).concat(_createPrivateData(false)));
                });

            _httpBackend.flush();
        });
    });

    describe('API for private account', function () {
        beforeEach(function () {
            _user.privateToken = 'bar';
        });

        it('should be able to get repositories', function () {
            _httpBackend
                .when('GET', 'https://api.travis-ci.com/repos?member=foo', { Authorization: 'token bar' })
                .respond(_createData());

            _httpBackend
                .when('GET', 'https://api.travis-ci.com/repos?owner_name=foo', { Authorization: 'token bar' })
                .respond(_createData());

            _travisRepository
                .get(_user)
                .then(function (repositories) {
                    expect(repositories).toEqual(_createPrivateData(true).concat(_createPrivateData(true)));
                });

            _httpBackend.flush();
        });
    });

    describe('API for public / private account', function () {
        beforeEach(function () {
            _user.publicToken = 'bar';
            _user.privateToken = 'baz';
        });

        it('should be able to get repositories', function () {
            _httpBackend
                .when('GET', 'https://api.travis-ci.org/repos?member=foo', { Authorization: 'token bar' })
                .respond(_createData());

            _httpBackend
                .when('GET', 'https://api.travis-ci.org/repos?owner_name=foo', { Authorization: 'token bar' })
                .respond(_createData());

            _httpBackend
                .when('GET', 'https://api.travis-ci.com/repos?member=foo', { Authorization: 'token baz' })
                .respond(_createData());

            _httpBackend
                .when('GET', 'https://api.travis-ci.com/repos?owner_name=foo', { Authorization: 'token baz' })
                .respond(_createData());

            _travisRepository
                .get(_user)
                .then(function (repositories) {
                    expect(repositories).toEqual(_createPrivateData(false).concat(
                        _createPrivateData(false).concat(
                            _createPrivateData(true).concat(_createPrivateData(true))
                        )
                    ));
                });

            _httpBackend.flush();
        });
    });
});
