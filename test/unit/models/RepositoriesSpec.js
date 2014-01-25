describe('RepositoriesSpec', function () {
    'use strict';

    var _collection;
    var _repositories;

    function _createData (slug) {
        return {
            id: 123,
            slug: slug
        };
    }

    function _createCollection () {
        return [ _createData('foo'), _createData('bar') ];
    }

    beforeEach(function () {
        _collection = _createCollection();
        _repositories = new Repositories(_collection);
    });

    it('should be able to get repositories', function () {
        expect(_repositories.all.length).toBe(_collection.length);

        expect(_repositories.all[0].data).toBe(_collection[0]);
        expect(_repositories.all[1].data).toBe(_collection[1]);
    });

    it('should be able to merge repositories', function () {
        var current = _repositories.all.slice(0);
        _repositories.all = _createCollection();

        expect(_repositories.all.length).toBe(current.length);

        expect(_repositories.all[0]).toBe(current[0]);
        expect(_repositories.all[1]).toBe(current[1]);
    });

    it('should be able to update repositories', function () {
        var current = _repositories.all.slice(0);
        var collection = _createCollection();
        collection[0].id = 234;

        _repositories.all = collection;

        expect(_repositories.all.length).toBe(current.length);

        expect(_repositories.all[0]).toBe(current[0]);
        expect(_repositories.all[0].data).toBe(collection[0]);

        expect(_repositories.all[1]).toBe(current[1]);
    });
});
