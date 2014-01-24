angular.module('travis-wall')
    .directive('ngTravisLogin', function ($timeout, TravisRepository) {
        'use strict';

        return {
            require: '^form',
            templateUrl: 'partials/travis-login.html',
            link: function (scope, element, attributes, control) {
                var _user = new User();
                var _timeout;

                function _initDetection() {
                    control.$detection = true;
                    _setValidity(true);
                }

                function _initProcessing() {
                    control.$detection = false;
                    control.$processing = true;
                }

                function _setValidity (validity) {
                    control.$setValidity('travis', validity);
                    control.$processing = false;
                }

                var _callback = function () {
                    $timeout.cancel(_timeout);

                    _initDetection();

                    _user.username = element.find('#travis-username').val().trim();
                    _user.token = element.find('#travis-token').val().trim();

                    if (_user.username === '') {
                        return;
                    }

                    _timeout = $timeout(function () {
                        _initProcessing();

                        TravisRepository
                            .get(_user)
                            .then(function (repositories) {
                                _setValidity(repositories.length > 0);
                            }, function () {
                                _setValidity(false);
                            });
                    }, 1000);
                };

                _initDetection();

                // FIXME - Using the keyup event is a joke because it absolutely does not cover all use cases.
                element.find('#travis-username').on('keyup', _callback);
                element.find('#travis-token').on('keyup', _callback);
            }
        };
    });
