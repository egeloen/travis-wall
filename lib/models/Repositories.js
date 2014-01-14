function Repositories (collection) {
    'use strict';

    var _collection = [];

    function _indexOf (slug) {
        for (var key in _collection) {
            if (_collection[key].slug === slug) {
                return key;
            }
        }
    }

    var _that = {
        get all () {
            return _collection;
        },
        set all (repositories) {
            for (var repositoryKey in repositories) {
                var repository = repositories[repositoryKey];
                var index = _indexOf(repository.slug);

                if (index === undefined) {
                    _collection.push(new Repository(repository));
                } else if (!_collection[index].compare(repository)) {
                    _collection[index].data = repository;
                }
            }
        }
    };

    if (collection === undefined) {
        collection = [];
    }

    _that.all = collection;

    return _that;
}
