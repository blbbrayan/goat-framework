zing.events.subscribe('show-barber-cards', function () {
    $env.barber = zing.snap('barber').get();
});

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