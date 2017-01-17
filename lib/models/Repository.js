function Repository (data) {
    'use strict';

    var TRAVIS_ORG_URL = 'https://travis-ci.org';
    var TRAVIS_COM_URL = 'https://magnum.travis-ci.com';
    var GITHUB_URL = 'https://github.com';

    var _data = data;

    var _buildStartedAt;
    var _buildFinishedAt;

    return {
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
        get BUILD_STATUS_CODE_UNTRACKED () {
            return 6;
        },
        get id () {
            return _data.id;
        },
        get private () {
            return _data.private;
        },
        get slug () {
            return _data.slug;
        },
        get description () {
            return _data.description;
        },
        get travisUrl () {
            return (this.private ? TRAVIS_COM_URL : TRAVIS_ORG_URL) + '/' + this.slug;
        },
        get githubUrl () {
            return GITHUB_URL + '/' + this.slug;
        },
        get buildId () {
            return _data.last_build_id;
        },
        get buildUrl () {
            return this.travisUrl + '/builds/' + this.buildId;
        },
        get buildNumber () {
            return _data.last_build_number;
        },
        get buildStatusCode () {
            switch (_data.last_build_status) {
                case 0:
                    return this.BUILD_STATUS_CODE_PASSED;

                case 1:
                    return this.BUILD_STATUS_CODE_FAILED;

                default:
                    if (!this.buildId) {
                        return this.BUILD_STATUS_CODE_UNTRACKED;
                    }

                    if (!this.buildStartedAt && !this.buildFinishedAt) {
                        return this.BUILD_STATUS_CODE_QUEUED;
                    }

                    if (this.buildStartedAt && !this.buildFinishedAt) {
                        return this.BUILD_STATUS_CODE_BUILDING;
                    }

                    if (this.buildStartedAt && this.buildFinishedAt) {
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

                case this.BUILD_STATUS_CODE_UNTRACKED:
                    return 'untracked';

                default:
                    return 'unknown';
            }
        },
        get buildDuration () {
            return _data.last_build_duration;
        },
        get buildLanguage () {
            return _data.last_build_language;
        },
        get buildStartedAt () {
            if (_buildStartedAt === undefined) {
                _buildStartedAt = _data.last_build_started_at ? new Date(_data.last_build_started_at) : null;
            }

            return _buildStartedAt;
        },
        get buildFinishedAt () {
            if (_buildFinishedAt === undefined) {
                _buildFinishedAt = _data.last_build_finished_at ? new Date(_data.last_build_finished_at) : null;
            }

            return _buildFinishedAt;
        },
        get data () {
            return _data;
        },
        set data (data) {
            _data = data;

            _buildStartedAt = undefined;
            _buildFinishedAt = undefined;
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

            return _compare(_data, data) && _compare(data, _data);
        }
    };
}
