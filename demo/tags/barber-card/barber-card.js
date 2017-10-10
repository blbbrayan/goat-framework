var barberIndex = $tag.getAttribute('display');

console.log('barber-card', barberIndex, $modules.data);
$env.barber = $modules.data.barbers[barberIndex];

zing.events.subscribe('show-barber-cards', function () {
    $env.barber = $modules.data.barbers[barberIndex];
});

$env.setUnd = function () {
    console.log('setUnd called');
    $env.barber = undefined;
};