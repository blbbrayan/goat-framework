$env.barber = zing.cache.get('barber');


$env.setUnd = function () {
    console.log('setUnd called');
    $env.barber = undefined;
    console.log($env.barber);
};