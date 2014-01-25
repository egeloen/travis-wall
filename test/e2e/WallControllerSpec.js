describe('WallControllerSpec', function () {
    'use strict';

    var _protractor = protractor.getInstance();

    beforeEach(function() {
        _protractor.get('#/egeloen');
    });

    it('should display the wall', function () {
        expect(_protractor.isElementPresent(by.id('repositories'))).toBeTruthy();
        expect(_protractor.element.all(by.className('repository')).count()).toBeGreaterThan(20);
    });
});
