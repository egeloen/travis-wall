describe('RepositorySpec', function () {
    'use strict';

    var _repository;
    var _data;

    var _startedAt;
    var _finishedAt;

    function _createData () {
        return {
            id: 123,
            private: false,
            slug: 'user/repository',
            description: 'description',
            last_build_id: 16392010,
            last_build_number: '321',
            last_build_language: 'php',
            last_build_duration: 61,
            last_build_started_at: _startedAt.toISOString(),
            last_build_finished_at: _finishedAt.toISOString(),
            last_build_status: 0,
            last_build_result: 0
        };
    }

    beforeEach(function() {
        _startedAt = new Date(Date.now() - 120000);
        _finishedAt = new Date(Date.now() - 60000);

        _data = _createData();
        _repository = new Repository(_data);
    });

    it('should be able to get the id', function () {
        expect(_repository.id).toBe(_data.id);
    });

    it('should be able to get the private flag', function () {
        expect(_repository.private).toBe(_data.private);
    });

    it('should be able to get the slug', function () {
        expect(_repository.slug).toBe(_data.slug);
    });

    it('should be able to get the description', function () {
        expect(_repository.description).toBe(_data.description);
    });

    it('should be able to get the github url', function () {
        expect(_repository.githubUrl).toBe('https://github.com/' + _data.slug);
    });

    it('should be able to get the travis url for a public repository', function () {
        expect(_repository.travisUrl).toBe('https://travis-ci.org/' + _data.slug);
    });

    it('should be able to get the travis url for a private repository', function () {
        _repository.data.private = true;

        expect(_repository.travisUrl).toBe('https://magnum.travis-ci.com/' + _data.slug);
    });

    it('should be able to get the build id', function () {
        expect(_repository.buildId).toBe(_data.last_build_id);
    });

    it('should be able to get the build url', function () {
        expect(_repository.buildUrl).toBe('https://travis-ci.org/' + _data.slug + '/builds/' + _data.last_build_id);
    });

    it('should be able to get the build number', function () {
        expect(_repository.buildNumber).toBe(_data.last_build_number);
    });

    it('should be able to get the build status passed', function () {
        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_PASSED);
        expect(_repository.buildStatus).toBe('passed');
    });

    it('should be able to get the build status errored', function () {
        _repository.data.last_build_status = -1;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_ERRORED);
        expect(_repository.buildStatus).toBe('errored');
    });

    it('should be able to get the build status failed', function () {
        _repository.data.last_build_status = 1;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_FAILED);
        expect(_repository.buildStatus).toBe('failed');
    });

    it('should be able to get the build status queued', function () {
        _repository.data.last_build_status = -1;
        _repository.data.last_build_started_at = null;
        _repository.data.last_build_finished_at = null;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_QUEUED);
        expect(_repository.buildStatus).toBe('queued');
    });

    it('should be able to get the build status building', function () {
        _repository.data.last_build_status = -1;
        _repository.data.last_build_finished_at = null;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_BUILDING);
        expect(_repository.buildStatus).toBe('building');
    });

    it('should be able to get the build status untracked', function () {
        _repository.data.last_build_status = null;
        _repository.data.last_build_id = null;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_UNTRACKED);
        expect(_repository.buildStatus).toBe('untracked');
    });

    it('should be able to get the build status unknown', function () {
        _repository.data.last_build_status = -1;
        _repository.data.last_build_started_at = null;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_UNKNOWN);
        expect(_repository.buildStatus).toBe('unknown');
    });

    it('should be able to get the duration', function () {
        expect(_repository.buildDuration).toBe(_data.last_build_duration);
    });

    it('should be able to get the language', function () {
        expect(_repository.buildLanguage).toBe(_data.last_build_language);
    });

    it('should be able to get the started at', function () {
        expect(_repository.buildStartedAt.getTime()).toBe(_startedAt.getTime());
    });

    it('should be able to get the finished at', function () {
        expect(_repository.buildFinishedAt.getTime()).toBe(_finishedAt.getTime());
    });

    it('should be able to get/set the data', function () {
        expect(_repository.data).toBe(_data);
    });

    it('should be able to get/set the data', function () {
        var data = _createData();
        _repository.data = data;

        expect(_repository.data).toBe(data);
    });

    describe('should be able to compare with an other repository data', function () {
        it('should be able to compare with a similar repository', function () {
            expect(_repository.compare(_createData())).toBeTruthy();
        });

        it('should be able to compare with a different repository', function () {
            var data = _createData();
            data.id = 321;

            expect(_repository.compare(data)).toBeFalsy();
        });
    });
});
