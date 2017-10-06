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

var dataModule = $modules.data;

console.log('modules', $modules);
console.log(dataModule.getQuartiles(console.log));