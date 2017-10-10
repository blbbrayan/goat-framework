var barberIndex = $tag.getAttribute('display');

$env.barber = $modules.data.barbers[barberIndex];

goat.events.subscribe('show-barber-cards', function () {
    $env.barber = $modules.data.barbers[barberIndex];
});

$env.setUnd = function () {
    $env.barber = undefined;
};