$env.toDocs = function(){
    window.open('#/documentation', '_self');
};

$env.showBarberCard = function() {
    zing.events.broadcast('show-barber-cards');
};

$env.clear = function () {
    zing.events.broadcast('clear-barber');
};

$env.barbers = [0, 1, 2];

console.log('modules', $modules);

var dataModule = $modules.data;
dataModule.getQuartiles(console.log);