describe('WallControllerSpec', function () {
    'use strict';

    var _scope;
    var _controller;
    var _routeParams;
    var _httpBackend;
    var _location;

    function _createController () {
        return _controller('WallController', { $scope: _scope});
    }

    beforeEach(function () {
        module('travis-wall');

        inject(function ($rootScope, $controller, $routeParams, $httpBackend, $location) {
            _scope = $rootScope.$new();
            _controller = $controller;
            _routeParams = $routeParams;
            _httpBackend = $httpBackend;
            _location = $location;
        });
    });

    it('should init a user accoding to the route parameters', function () {
        _routeParams.username = 'foo';
        _createController();

        expect(_scope.user).toBeDefined();
        expect(_scope.user.username).toBe('foo');
    });

    it('should init the user repositories if there are ones', function () {
        _routeParams.username = 'foo';

        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?member=foo')
            .respond([ { slug: 'user/repository-1' } ]);

        _createController();

        _httpBackend.flush();

        expect(_scope.user.repositories.length).toBe(1);
    });

    it('should redirect the user to the homepage if there is no repositories', function () {
        _routeParams.username = 'foo';

        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?member=foo')
            .respond([]);

        _httpBackend
            .when('GET', 'https://api.travis-ci.org/repos?owner_name=foo')
            .respond([]);

        _createController();

        expect(_location.path()).toBe('');
    });
});
