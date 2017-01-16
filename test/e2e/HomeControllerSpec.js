describe('HomeControllerSpec', function () {
    'use strict';

    var _username;
    var _publicToken;
    var _privateToken;
    var _error;
    var _button;

    beforeEach(function() {
        browser.get('#!/');

        _username = by.model('user.username');
        _publicToken = by.model('user.publicToken');
        _privateToken = by.model('user.privateToken');
        _error = by.className('error');
        _button = by.tagName('button');
    });

    it('should display the login form', function () {
        expect(browser.isElementPresent(_username)).toBeTruthy();
        expect(browser.findElement(_username).isDisplayed()).toBeTruthy();

        expect(browser.isElementPresent(_publicToken)).toBeTruthy();
        expect(browser.findElement(_publicToken).isDisplayed()).toBeTruthy();

        expect(browser.isElementPresent(_privateToken)).toBeTruthy();
        expect(browser.findElement(_privateToken).isDisplayed()).toBeTruthy();

        expect(browser.isElementPresent(_error)).toBeTruthy();
        expect(browser.findElement(_error).isDisplayed()).toBeFalsy();

        expect(browser.isElementPresent(_button)).toBeTruthy();
        expect(browser.findElement(_button).isEnabled()).toBeFalsy();
    });

    it('should display an error message if the username / public token are not valid', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_publicToken).sendKeys('invalid');

        expect(browser.findElement(_error).isDisplayed()).toBeTruthy();
    });

    it('should not display the monitor button if the username / public token are not valid', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_publicToken).sendKeys('invalid');

        expect(browser.findElement(_button).isEnabled()).toBeFalsy();
    });

    it('should enable the monitor button if the username / public token are valid', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_publicToken).sendKeys('public-token');

        expect(browser.findElement(_button).isEnabled()).toBeTruthy();
    });

    it('should display an error message if the username / private token are not valid', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_privateToken).sendKeys('invalid');

        expect(browser.findElement(_error).isDisplayed()).toBeTruthy();
    });

    it('should not display the monitor button if the username / private token are not valid', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_privateToken).sendKeys('invalid');

        expect(browser.findElement(_button).isEnabled()).toBeFalsy();
    });

    it('should enable the monitor button if the username / private token are valid', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_privateToken).sendKeys('private-token');

        expect(browser.findElement(_button).isEnabled()).toBeTruthy();
    });

    it('should display an error message if the username / public token / private token are not valid', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_publicToken).sendKeys('invalid');
        browser.findElement(_privateToken).sendKeys('invalid');

        expect(browser.findElement(_error).isDisplayed()).toBeTruthy();
    });

    it('should not display the monitor button if the username / public token / private token are not valid', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_publicToken).sendKeys('invalid');
        browser.findElement(_privateToken).sendKeys('invalid');

        expect(browser.findElement(_button).isEnabled()).toBeFalsy();
    });

    it('should enable the monitor button if the username / public token / private token are valid', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_publicToken).sendKeys('public-token');
        browser.findElement(_privateToken).sendKeys('private-token');

        expect(browser.findElement(_button).isEnabled()).toBeTruthy();
    });

    it('should redirect the user on the wall if he clicks on the button (public token)', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_publicToken).sendKeys('public-token');
        browser.findElement(_button).click();

        expect(browser.getCurrentUrl()).toContain('/#!/egeloen?public-token=public-token');
    });

    it('should redirect the user on the wall if he clicks on the button (private token)', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_privateToken).sendKeys('private-token');
        browser.findElement(_button).click();

        expect(browser.getCurrentUrl()).toContain('/#!/egeloen?private-token=private-token');
    });

    it('should redirect the user on the wall if he clicks on the button (public / private token)', function () {
        browser.findElement(_username).sendKeys('egeloen');
        browser.findElement(_publicToken).sendKeys('public-token');
        browser.findElement(_privateToken).sendKeys('private-token');
        browser.findElement(_button).click();

        expect(browser.getCurrentUrl()).toContain('/#!/egeloen?public-token=public-token&private-token=private-token');
    });
});
