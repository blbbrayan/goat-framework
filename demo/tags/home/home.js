$env.toDocs = function(){
    window.open('#/documentation', '_self');
};

$env.showBarberCard = function() {
    zing.broadcast('show-barber-card', zing.cache.get('barber'));
};

$env.barbers = [0, 1, 2];