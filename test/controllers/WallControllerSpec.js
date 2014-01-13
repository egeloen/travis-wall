describe('WallControllerSpec', function () {
    'use strict';

    var _scope;
    var _controller;
    var _routeParams;
    var _q;
    var _location;
    var _travisRepository;
    var _repositories;

    function _createController () {
        return _controller('WallController', { $scope: _scope});
    }

    beforeEach(function () {
        module('travis-wall');

        _travisRepository = {
            get: function () {
                var deferred = _q.defer();
                deferred.resolve(_repositories);

                return deferred.promise;
            }
        };

        spyOn(_travisRepository, 'get').andCallThrough();

        module(function ($provide) {
            $provide.value('TravisRepository', _travisRepository);
        });

        inject(function ($rootScope, $controller, $routeParams, $q, $location) {
            _scope = $rootScope.$new();
            _controller = $controller;
            _routeParams = $routeParams;
            _q = $q;
            _location = $location;
        });

        _repositories = [ { slug: 'user/repository' } ];
    });

    it('should init a user accoding to the username in the route parameters', function () {
        _routeParams.username = 'foo';

        _createController();

        expect(_scope.user).toBeDefined();
        expect(_scope.user.username).toBe('foo');
        expect(_scope.user.token).toBe('');
    });

    it('should init a user accoding to the username/token in the route parameters', function () {
        _routeParams.username = 'foo';
        _routeParams.token = 'bar';

        _createController();

        expect(_scope.user).toBeDefined();
        expect(_scope.user.username).toBe('foo');
        expect(_scope.user.token).toBe('bar');
    });

    it('should init the user repositories if there are ones', function () {
        _createController();

        _scope.$digest();

        expect(_travisRepository.get).toHaveBeenCalledWith(_scope.user);
        expect(_scope.user.repositories.length).toBe(1);
    });

    it('should redirect the user to the homepage if there is no repositories', function () {
        _repositories = [];
        _createController();

        _scope.$digest();

        expect(_travisRepository.get).toHaveBeenCalledWith(_scope.user);
        expect(_location.path()).toBe('/');
    });
});
