var dataModule = $modules.data;

$env.toDocs = function(){
    window.open('#/documentation', '_self');
};

$env.showBarberCard = function() {
    zing.events.broadcast('show-barber-cards');
};

$env.clear = function () {
    dataModule.clearBarbers();
};

$env.barbers = dataModule.barbers;

console.log('modules', $modules);

