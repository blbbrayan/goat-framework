(function () {

    var subscriptions = {};

    window.zing.broadcast = function (name, obj) {
        if(!subscriptions[name])
            subscriptions[name] = [];
        subscriptions[name].forEach(function (on){
            on(obj);
        });
    };

    window.zing.subscribe = function (name, on){
        if(!subscriptions[name])
            subscriptions[name] = [];
        subscriptions[name].push(on);
    };

})();