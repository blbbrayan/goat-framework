$env.barber = zing.cache.get('barber');

$env.guid = function _generateGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}();

$env.setUnd = function () {
    console.log('setUnd called');
    $env.barber = undefined;
};

zing.subscribe('show-barber-card', function (barber) {
    $env.barber = barber;
});

console.log($env.barber, $intervalfn);