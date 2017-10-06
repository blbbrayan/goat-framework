var barberIndex = $tag.getAttribute('display');

$env.barber = zing.snap('barbers').get()[barberIndex];
zing.events.subscribe('show-barber-cards', function () {
    $env.barber = zing.snap('barbers').get()[barberIndex];
    console.log($env.barber);
});

$env.setUnd = function () {
    console.log('setUnd called');
    $env.barber = undefined;
};