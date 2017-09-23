(function (global) {

    var cache = {
        cache: function (name, obj) {
            console.log("called", name, obj);
            if (obj)
                cache[name] = obj;
            return cache[name];
        }
    };

    global.zing.extend(cache);

}(window));