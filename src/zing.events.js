(function (zing) {

    var subscriptions = {};
    var handler = {
        broadcast: function (name, obj) {
            if(!subscriptions[name])
                subscriptions[name] = [];
            subscriptions[name].forEach(function (on){
                on(obj);
            });
        },
        subscribe: function (name, on){
            if(!subscriptions[name])
                subscriptions[name] = [];
            subscriptions[name].push(on);
        }
    };

    zing.extend({events: handler});

})(window.zing);