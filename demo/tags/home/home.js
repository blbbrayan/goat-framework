var dataModule = $modules.data;

$env.toDocs = function(){
    window.open('#/documentation', '_self');
};

$env.showBarberCard = function() {
    goat.events.broadcast('show-barber-cards');
};

$env.clear = function () {
    dataModule.clearBarbers();
};

$env.barbers = dataModule.barbers;