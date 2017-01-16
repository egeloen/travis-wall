exports.config = {
    baseUrl: 'http://localhost:3000',
    specs: [ 'test/e2e/**/*Spec.js' ],
    capabilities: {
        browserName: 'chrome'
    },
    onPrepare: function () {
        browser.addMockModule('httpBackendMock', function() {
            angular.module('httpBackendMock', ['ngMockE2E']).run(['$httpBackend', function($httpBackend) {
                function _createData(slug) {
                    return {
                        "id": 1,
                        "slug": slug,
                        "description": "foo",
                        "last_build_id": 2,
                        "last_build_number": "3",
                        "last_build_status": 1,
                        "last_build_result": 1,
                        "last_build_duration": 123,
                        "last_build_language": null,
                        "last_build_started_at": "2017-01-15T01:21:50Z",
                        "last_build_finished_at": "2017-01-15T01:23:45Z",
                        "active": true
                    };
                }

                var regex = /^https:\/\/api\.travis\-ci\.(org|com)\/repos\?(member|owner_name)=egeloen$/;

                var response = function (method, url, data, headers) {
                    var matches = regex.exec(url);

                    if (matches[1] === 'org' && headers.Authorization !== 'token public-token') {
                        return [403];
                    }

                    if (matches[1] === 'com' && headers.Authorization !== 'token private-token') {
                        return [403];
                    }

                    return [200, [_createData('repository-' + matches[1] + '-' + matches[2])]];
                };

                $httpBackend
                    .whenGET(regex)
                    .respond(response);

                $httpBackend
                    .whenGET(/.*/)
                    .passThrough();
            }]);
        });
    }
};

if (process.env.TRAVIS) {
    exports.config.capabilities.chromeOptions = {
        binary: './chrome-linux/chrome',
        args: ['--no-sandbox']
    };
}
