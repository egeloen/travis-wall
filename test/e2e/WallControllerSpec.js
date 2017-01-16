describe('WallControllerSpec', function () {
    'use strict';

    it('should display the public wall', function () {
        browser.get('#!/egeloen?public-token=public-token');

        expect(browser.isElementPresent(by.id('repositories'))).toBeTruthy();
        expect(browser.element.all(by.className('repository')).count()).toBe(2);
    });

    it('should display the private wall', function () {
        browser.get('#!/egeloen?private-token=private-token');

        expect(browser.isElementPresent(by.id('repositories'))).toBeTruthy();
        expect(browser.element.all(by.className('repository')).count()).toBe(2);
    });

    it('should display the public / private wall', function () {
        browser.get('#!/egeloen?public-token=public-token&private-token=private-token');

        expect(browser.isElementPresent(by.id('repositories'))).toBeTruthy();
        expect(browser.element.all(by.className('repository')).count()).toBe(4);
    });

    it('should redirect to the homepage if the public token is not valid', function () {
        browser.get('#!/egeloen?public-token=invalid');

        expect(browser.getCurrentUrl()).toContain('/#!/');
    });

    it('should redirect to the homepage if the private token is not valid', function () {
        browser.get('#!/egeloen?private-token=invalid');

        expect(browser.getCurrentUrl()).toContain('/#!/');
    });

    it('should redirect to the homepage if the public / private token is not valid', function () {
        browser.get('#!/egeloen?public-token=invalid&private-token=invalid');

        expect(browser.getCurrentUrl()).toContain('/#!/');
    });
});
