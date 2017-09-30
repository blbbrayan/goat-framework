$env.toDocs = function(){
    window.open('#/documentation', '_self');
};

$env.showBarberCard = function() {
    $env.barber = zing.cache.get('barber');
    console.log($env);
};

setTimeout(function(){
    $env.barber = zing.cache.get('barber');
    console.log($env);
}, 500);
