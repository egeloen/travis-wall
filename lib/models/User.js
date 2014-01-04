function User (username, repositories) {
    var _username;
    var _repositories = new Repositories();

    var _that = {
        get username () {
            return _username;
        },
        set username (username) {
            _username = username;
        },
        get repositories () {
            return _repositories;
        }
    };

    _that.username = username;
    _that.repositories = repositories;

    return _that;
}
