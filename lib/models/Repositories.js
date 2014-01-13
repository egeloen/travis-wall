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
                var repository = new Repository(repositories[repositoryKey]);
                var index = _indexOf(repository.slug);

                if (index === undefined) {
                    _collection.push(repository);
                } else if (!_collection[index].compare(repository)) {
                    _collection[index].data = repository.data;
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
