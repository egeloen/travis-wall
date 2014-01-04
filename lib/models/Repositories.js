function Repositories (repositories) {
    var _repositories = [];

    function _getIndex (slug) {
        for (var index in _repositories) {
            if (_repositories[index].slug === slug) {
                return index;
            }
        }
    }

    function _clean (slugs) {
        for (var index in _repositories) {
            if (slugs.indexOf(_repositories[index].slug) === -1) {
                _that.remove(_repositories[index].slug);
            }
        }
    }

    var _that = {
        get all () {
            return _repositories;
        },
        set all (repositories) {
            var slugs = [];

            for (var index in repositories) {
                var repository = new Repository(repositories[index]);

                if (!this.has(repository.slug) || !this.get(repository.slug).compare(repository)) {
                    this.add(repository);
                }

                slugs.push(repository.slug);
            }

            _clean(slugs);
        },
        has: function (slug) {
            return _getIndex(slug) !== undefined;
        },
        get: function (slug) {
            var index = _getIndex(slug);

            if (index === undefined) {
                throw new Error('The repository ' + slug + ' does not exist.');
            }

            return _repositories[index];
        },
        add: function (repository) {
            var index = _getIndex(repository.slug);

            if (index === undefined) {
                _repositories.push(repository);
            } else {
                _repositories[index].merge(repository);
            }
        },
        remove: function (slug) {
            var index = _getIndex(slug);

            if (index === undefined) {
                throw new Error('The repository ' + slug + ' does not exist.');
            }

            return _repositories.splice(index, 1);
        }
    };

    if (repositories === undefined) {
        repositories = [];
    }

    _that.all = repositories;

    return _that;
}
