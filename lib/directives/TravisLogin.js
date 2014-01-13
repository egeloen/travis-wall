angular.module('travis-wall')
    .directive('ngTravisLogin', function ($timeout, TravisRepository) {
        'use strict';

        return {
            require: '^form',
            templateUrl: 'partials/travis-login.html',
            link: function (scope, element, attributes, control) {
                var _user = new User();
                var _timeout;

                control.$detection = true;
                control.$processing = false;

                var _callback = function () {
                    $timeout.cancel(_timeout);

                    _user.username = element.find('#travis-username').val().trim();
                    _user.token = element.find('#travis-token').val().trim();

                    control.$detection = true;
                    control.$setValidity('travis', true);

                    _timeout = $timeout(function () {
                        control.$detection = false;
                        control.$processing = true;

                        TravisRepository
                            .get(_user)
                            .then(function (repositories) {
                                control.$setValidity('travis', repositories.length > 0);
                                control.$processing = false;
                            });
                    }, 1000);
                };

                // FIXME - Using the keyup event is a joke because it absolutely does not cover all use cases.
                element.find('#travis-username').on('keyup', _callback);
                element.find('#travis-token').on('keyup', _callback);
            }
        };
    });
