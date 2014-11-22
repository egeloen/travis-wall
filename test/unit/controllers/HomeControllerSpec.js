describe('HomeControllerSpec', function () {
    'use strict';

    var _scope;
    var _controller;
    var _q;
    var _location;
    var _travisRepository;
    var _repositories;

    function _createController () {
        return _controller('HomeController', { $scope: _scope });
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

        spyOn(_travisRepository, 'get').and.callThrough();

        module(function ($provide) {
            $provide.value('TravisRepository', _travisRepository);
        });

        inject(function ($rootScope, $controller, $q, $location) {
            _scope = $rootScope.$new();
            _controller = $controller;
            _q = $q;
            _location = $location;
        });

        _repositories = [ { slug: 'user/repository' } ];
    });

    it('should init an empty user', function () {
        _createController();

        expect(_scope.user).toBeDefined();
    });

    it('should redirect user on the wall if the username have repositories', function () {
        _createController();

        _scope.user.username = 'foo';

        _scope.login();
        _scope.$digest();

        expect(_travisRepository.get).toHaveBeenCalledWith(_scope.user);
        expect(_location.path()).toBe('/foo');
    });

    it('should redirect user on the wall if the username/token have repositories', function () {
        _createController();

        _scope.user.username = 'foo';
        _scope.user.token = 'bar';

        _scope.login();
        _scope.$digest();

        expect(_travisRepository.get).toHaveBeenCalledWith(_scope.user);

        expect(_location.path()).toBe('/foo');

        expect(_location.search().token).toBeDefined();
        expect(_location.search().token).toBe('bar');
    });

    it('should not redirect user on the wall if the username have no repositories', function () {
        _repositories = [];
        _createController();

        _scope.user.username = 'foo';

        _scope.login();
        _scope.$digest();

        expect(_travisRepository.get).toHaveBeenCalledWith(_scope.user);
        expect(_location.path()).toBe('');
    });
});
