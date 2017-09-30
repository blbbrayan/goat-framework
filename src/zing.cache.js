(function (zing) {
    
    var _cache = [];
    var cache = {        
        remove: function(name) {
            var itemIdx = _cache.findIndex(function(o) {
                return o.key === name;
            });
            if (itemIdx !== -1) {
                _cache.splice(itemIdx, 1);
            }
        },
        clear: function() {
            _cache = [];
        },
        add: function(name, obj) {
            this.remove(name);

            _cache.push({key: name, value: obj});
        },
        get: function(name) {
            var item = _cache.find(function(obj) {
                return obj.key === name;
            });

            return item.value;
        }
    };

    zing.extend({cache: cache});

}(window.zing));