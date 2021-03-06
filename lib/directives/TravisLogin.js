angular.module('travis-wall')
    .directive('ngTravisLogin', function (TravisRepository) {
        'use strict';

        return {
            restrict: 'E',
            require: '^form',
            replace: true,
            templateUrl: 'partials/travis-login.html',
            scope: { user: '=' },
            link: function (scope, element, attributes, control) {
                scope.form = control;

                function _initDetection() {
                    control.$detection = true;
                    _setValidity(true);
                }

                function _initProcessing() {
                    control.$processing = true;
                    control.$detection = false;
                }

                function _setValidity (validity) {
                    control.$setValidity('travis', validity);
                    control.$processing = false;
                }

                var _callback = function (user) {
                    if (!user) {
                        return;
                    }

                    _initDetection();

                    if (!user.username || (!user.publicToken && !user.privateToken)) {
                        return;
                    }

                    _initProcessing();

                    TravisRepository
                        .get(user)
                        .then(function (repositories) {
                            _setValidity(repositories.length > 0);
                        })
                        .catch(function () {
                            _setValidity(false);
                        });
                };

                _initDetection();

                scope.$on('$destroy', scope.$watch('user', _callback, true));
            }
        };
    });
