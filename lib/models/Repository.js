function Repository (data) {
    'use strict';

    var TRAVIS_ORG_URL = 'https://travis-ci.org';
    var TRAVIS_COM_URL = 'https://magnum.travis-ci.com';

    var GITHUB_URL = 'https://github.com';

    var _data;

    var _buildDuration;
    var _buildStartedAt;
    var _buildFinishedAt;

    var _that = {
        get BUILD_STATUS_CODE_PASSED () {
            return 0;
        },
        get BUILD_STATUS_CODE_UNKNOWN () {
            return 1;
        },
        get BUILD_STATUS_CODE_ERRORED () {
            return 2;
        },
        get BUILD_STATUS_CODE_FAILED () {
            return 3;
        },
        get BUILD_STATUS_CODE_QUEUED () {
            return 4;
        },
        get BUILD_STATUS_CODE_BUILDING () {
            return 5;
        },
        get id () {
            return this.data.id;
        },
        get private () {
            return this.data.private;
        },
        get slug () {
            return this.data.slug;
        },
        get description () {
            return this.data.description;
        },
        get travisUrl () {
            return (this.private ? TRAVIS_COM_URL : TRAVIS_ORG_URL) + '/' + this.slug;
        },
        get githubUrl () {
            return GITHUB_URL + '/' + this.slug;
        },
        get buildId () {
            return this.data.last_build_id;
        },
        get buildUrl () {
            return this.travisUrl + '/builds/' + this.buildId;
        },
        get buildNumber () {
            return this.data.last_build_number;
        },
        get buildStatusCode () {
            switch (this.data.last_build_status) {
                case 0:
                    return this.BUILD_STATUS_CODE_PASSED;

                case 1:
                    return this.BUILD_STATUS_CODE_FAILED;

                default:
                    if ((this.buildStartedAt === null) && (this.buildFinishedAt === null)) {
                        return this.BUILD_STATUS_CODE_QUEUED;
                    }

                    if ((this.buildStartedAt !== null) && (this.buildFinishedAt === null)) {
                        return this.BUILD_STATUS_CODE_BUILDING;
                    }

                    if ((this.buildStartedAt !== null) && (this.buildFinishedAt !== null)) {
                        return this.BUILD_STATUS_CODE_ERRORED;
                    }

                    return this.BUILD_STATUS_CODE_UNKNOWN;
            }
        },
        get buildStatus () {
            switch (this.buildStatusCode) {
                case this.BUILD_STATUS_CODE_PASSED:
                    return 'passed';

                case this.BUILD_STATUS_CODE_FAILED:
                    return 'failed';

                case this.BUILD_STATUS_CODE_ERRORED:
                    return 'errored';

                case this.BUILD_STATUS_CODE_QUEUED:
                    return 'queued';

                case this.BUILD_STATUS_CODE_BUILDING:
                    return 'building';

                default:
                    return 'unknown';
            }
        },
        get buildDuration () {
            return _buildDuration;
        },
        get buildHumanDuration () {
            return this.buildDuration !== null ? this.buildDuration.from(0, true) : null;
        },
        get buildLanguage () {
            return this.data.last_build_language;
        },
        get buildStartedAt () {
            return _buildStartedAt;
        },
        get buildHumanStartedAt () {
            return this.buildStartedAt !== null ? this.buildStartedAt.fromNow() : null;
        },
        get buildFinishedAt () {
            return _buildFinishedAt;
        },
        get buildHumanFinishedAt () {
            return this.buildFinishedAt !== null ? this.buildFinishedAt.fromNow() : null;
        },
        get data () {
            return _data;
        },
        set data (data) {
            _data = data;

            _buildDuration = data.last_build_duration !== null ? moment(data.last_build_duration * 1000) : null;
            _buildStartedAt = data.last_build_started_at !== null ? moment(data.last_build_started_at) : null;
            _buildFinishedAt = data.last_build_finished_at !== null ? moment(data.last_build_finished_at) : null;
        },
        compare: function (data) {
            function _compare (object, subject) {
                for (var key in object) {
                    if (object[key] !== subject[key]) {
                        return false;
                    }
                }

                return true;
            }

            return _compare(this.data, data) && _compare(data, this.data);
        }
    };

    _that.data = data;

    return _that;
}
