$env.barber = zing.cache('barber');


$env.setUnd = function () {
    console.log('setUnd called');
    $env.barber = undefined;
    console.log($env.barber);
};