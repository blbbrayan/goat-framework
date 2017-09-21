(function () {

    var cache = {};

    window.zing.cache = function (name, obj) {
        console.log("called", name, obj);
        if(obj)
            cache[name] = obj;
        return cache[name];
    }

})();