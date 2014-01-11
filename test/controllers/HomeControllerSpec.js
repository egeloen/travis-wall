describe('HomeControllerSpec', function () {
    'use strict';

    var _scope;
    var _controller;
    var _httpBackend;
    var _location;

    function _createController () {
        return _controller('HomeController', { $scope: _scope });
    }

    beforeEach(function () {
        module('travis-wall');

        inject(function ($rootScope, $controller, $httpBackend, $location) {
            _scope = $rootScope.$new();
            _controller = $controller;
            _httpBackend = $httpBackend;
            _location = $location;
        });
    });

    afterEach(function() {
        _httpBackend.verifyNoOutstandingExpectation();
        _httpBackend.verifyNoOutstandingRequest();
    });

    it('should init an empty user', function () {
        _createController();

        expect(_scope.user).toBeDefined();

        expect(_scope.user.username).toBe('');
        expect(_scope.user.repositories).toEqual([]);
    });

    it('should redirect user on the wall if the username have repositories', function () {
        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?member=foo')
            .respond([ { slug: 'user/repository-1' } ]);

        _createController();

        _scope.user.username = 'foo';
        _scope.login();

        _httpBackend.flush();

        expect(_location.path()).toBe('/foo');
    });

    it('should not redirect user on the wall if the username have no repositories', function () {
        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?member=foo')
            .respond([]);

        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?owner_name=foo')
            .respond([]);

        _createController();

        _scope.user.username = 'foo';
        _scope.login();

        _httpBackend.flush();

        expect(_location.path()).toBe('');
    });
});
