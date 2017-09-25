(function (zing) {

    var _cache = {};

    function cache(name, obj) {
        if (obj)
            _cache[name] = obj;
        return _cache[name];
    }

    zing.extend({cache: cache});

}(window.zing));