function Repository (data) {
    var TRAVIS_URL = 'https://travis-ci.org';
    var GITHUB_URL = 'https://github.com';

    var STATUS_CODE_PASSED = 0;
    var STATUS_CODE_UNKNOWN = 1;
    var STATUS_CODE_FAILED = 2;
    var STATUS_CODE_BUILDING = 3;

    var STATUS_PASSED = 'passed';
    var STATUS_UNKNOWN = 'unknown';
    var STATUS_FAILED = 'failed';
    var STATUS_BUILDING = 'building';

    var _data;

    var _buildDuration;
    var _buildStartedAt;
    var _buildFinishedAt;

    function _setData (data) {
        _data = data;

        _buildDuration = data.last_build_duration !== null ? moment(data.last_build_duration * 1000) : null;
        _buildStartedAt = data.last_build_started_at !== null ? moment(data.last_build_started_at) : null;
        _buildFinishedAt = data.last_build_finished_at !== null ? moment(data.last_build_finished_at) : null;
    }

    _setData(data);

    return {
        get id () {
            return this.data.id;
        },
        get slug () {
            return this.data.slug;
        },
        get description () {
            return this.data.description;
        },
        get travisUrl () {
            return TRAVIS_URL + '/' + this.slug;
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
            if ((this.buildStartedAt !== null) && (this.buildFinishedAt === null)) {
                return STATUS_CODE_BUILDING;
            }

            switch (this.data.last_build_status) {
                case 0:
                    return STATUS_CODE_PASSED;

                case 1:
                    return STATUS_CODE_FAILED;

                default:
                    return STATUS_CODE_UNKNOWN;
            }
        },
        get buildStatus () {
            switch (this.buildStatusCode) {
                case STATUS_CODE_PASSED:
                    return STATUS_PASSED;

                case STATUS_CODE_FAILED:
                    return STATUS_FAILED;

                case STATUS_CODE_BUILDING:
                    return STATUS_BUILDING;

                default:
                    return STATUS_UNKNOWN;
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
        merge: function (repository) {
            _setData(repository.data);
        },
        compare: function (repository) {
            for (var index in this.data) {
                if (this.data[index] !== repository.data[index]) {
                    return false;
                }
            }

            for (var index in repository.data) {
                if (repository.data[index] !== this.data[index]) {
                    return false;
                }
            }

            return true;
        }
    };
}
