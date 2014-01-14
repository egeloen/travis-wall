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
        var data = _createData();
        data.last_build_status = -1;

        _repository.data = data;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_ERRORED);
        expect(_repository.buildStatus).toBe('errored');
    });

    it('should be able to get the build status failed', function () {
        var data = _createData();
        data.last_build_status = 1;

        _repository.data = data;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_FAILED);
        expect(_repository.buildStatus).toBe('failed');
    });

    it('should be able to get the build status queued', function () {
        var data = _createData();
        data.last_build_status = -1;
        data.last_build_started_at = null;
        data.last_build_finished_at = null;

        _repository.data = data;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_QUEUED);
        expect(_repository.buildStatus).toBe('queued');
    });

    it('should be able to get the build status building', function () {
        var data = _createData();
        data.last_build_status = -1;
        data.last_build_finished_at = null;

        _repository.data = data;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_BUILDING);
        expect(_repository.buildStatus).toBe('building');
    });

    it('should be able to get the build status unknown', function () {
        var data = _createData();
        data.last_build_status = -1;
        data.last_build_started_at = null;

        _repository.data = data;

        expect(_repository.buildStatusCode).toBe(_repository.BUILD_STATUS_CODE_UNKNOWN);
        expect(_repository.buildStatus).toBe('unknown');
    });

    it('should be able to get the duration', function () {
        expect(_repository.buildDuration.unix()).toBe(_data.last_build_duration);
    });

    it('should be able to get the human duration', function () {
        expect(_repository.buildHumanDuration).toBe('a minute');
    });

    it('should be able to get the language', function () {
        expect(_repository.buildLanguage).toBe(_data.last_build_language);
    });

    it('should be able to get the started at', function () {
        var timestamp = Math.round(_startedAt.getTime() / 1000);

        expect(_repository.buildStartedAt.unix()).toBeGreaterThan(timestamp - 2);
        expect(_repository.buildStartedAt.unix()).toBeLessThan(timestamp + 2);
    });

    it('should be able to get the human started at', function () {
        expect(_repository.buildHumanStartedAt).toBe('2 minutes ago');
    });

    it('should be able to get the finished at', function () {
        var timestamp = Math.round(_finishedAt.getTime() / 1000);

        expect(_repository.buildFinishedAt.unix()).toBeGreaterThan(timestamp - 2);
        expect(_repository.buildFinishedAt.unix()).toBeLessThan(timestamp + 2);
    });

    it('should be able to get the human finished at', function () {
        expect(_repository.buildHumanFinishedAt).toBe('a minute ago');
    });

    it('should be able to get/set the data', function () {
        expect(_repository.data).toBe(_data);
    });

    it('should be able to get/set the data', function () {
        var data = _createData();
        _repository.data = data;

        expect(_repository.data).toBe(data);
    });

    describe('should be able to compare with an other repository', function () {
        var _cloneRepository;

        beforeEach(function () {
            _cloneRepository = new Repository(_createData());
        });

        it('should be able to compare with a similar repository', function () {
            expect(_repository.compare(_cloneRepository)).toBeTruthy();
        });

        it('should be able to compare with a different repository', function () {
            var data = _createData();
            data.id = 321;

            _cloneRepository.data = data;

            expect(_repository.compare(_cloneRepository)).toBeFalsy();
        });
    });
});
