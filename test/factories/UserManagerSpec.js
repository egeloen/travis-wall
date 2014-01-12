describe('UserManagerSpec', function () {
    'use strict';

    var _userManager;

    beforeEach(function () {
        module('travis-wall');

        inject(function (UserManager) {
            _userManager = UserManager;
        });
    });

    it('should be able to init a user', function () {
        expect(_userManager.user).toEqual(new User());
    });

    it('should be able to manage a user', function () {
        _userManager.user.username = 'foo';

        expect(_userManager.user.username).toBe('foo');
    });
});
