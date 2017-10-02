$env.barber = zing.cache.get('barber');

$env.setUnd = function () {
    console.log('setUnd called');
    $env.barber = undefined;
};

zing.subscribe('show-barber-card', function (barber) {
    $env.barber = barber;
});

console.log($env.barber, $intervalfn);