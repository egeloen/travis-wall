describe('HomeControllerSpec', function () {
    'use strict';

    var _protractor = protractor.getInstance();
    var _username;
    var _token;
    var _success;
    var _error;
    var _button;

    beforeEach(function() {
        _protractor.get('#/');

        _username = by.model('user.username');
        _token = by.model('user.token');
        _success = by.className('success');
        _error = by.className('error');
        _button = by.tagName('button');
    });

    it('should display the login form', function () {
        expect(_protractor.isElementPresent(_username)).toBeTruthy();
        expect(_protractor.findElement(_username).isDisplayed()).toBeTruthy();

        expect(_protractor.isElementPresent(_token)).toBeTruthy();
        expect(_protractor.findElement(_token).isDisplayed()).toBeTruthy();

        expect(_protractor.isElementPresent(_success)).toBeTruthy();
        expect(_protractor.findElement(_success).isDisplayed()).toBeFalsy();

        expect(_protractor.isElementPresent(_error)).toBeTruthy();
        expect(_protractor.findElement(_error).isDisplayed()).toBeFalsy();

        expect(_protractor.isElementPresent(_button)).toBeTruthy();
        expect(_protractor.findElement(_button).isDisplayed()).toBeFalsy();
    });

    it('should display an error message if the username is not valid', function () {
        _protractor.findElement(_username).sendKeys('blog');
        expect(_protractor.findElement(_error).isDisplayed()).toBeTruthy();
    });

    it('should not display the monitor button if the username is not valid', function () {
        _protractor.findElement(_username).sendKeys('blog');
        expect(_protractor.findElement(_button).isDisplayed()).toBeFalsy();
    });

    it('should display a success message if the username is valid', function () {
        _protractor.findElement(_username).sendKeys('egeloen');
        expect(_protractor.findElement(_success).isDisplayed()).toBeTruthy();
    });

    it('should display the monitor button if the username is valid', function () {
        _protractor.findElement(_username).sendKeys('egeloen');
        expect(_protractor.findElement(_button).isDisplayed()).toBeTruthy();
    });

    it('should redirect the user on the wall if he clicks on the button', function () {
        _protractor.findElement(_username).sendKeys('egeloen');
        _protractor.findElement(_button).click();

        expect(_protractor.getCurrentUrl()).toContain('/#/egeloen');
    });
});
