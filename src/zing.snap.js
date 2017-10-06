(function (zing) {

    var _data = {};

    function snap(name) {
        var get = function () {
            return _data[name]
        };
        var set = function (obj) {
            _data[name] = obj;
        };
        var clear = function () {
            delete _data[name];
        };
        var watch = function (obj) {
            var interval = setInterval(function () {
                if (obj !== get())
                    set(obj);
            }, 100);
            return {
                stop: function () {
                    clearInterval(interval)
                }
            }
        };
        return{
            get: get,
            set: set,
            clear: clear,
            watch: watch
        }
    }

    zing.extend({snap: snap});

})(window.zing);