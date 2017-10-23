$env.barber = $req.barber;

goat.events.subscribe('show-barber-cards', function () {
    $env.barber = $req.barber;
});

$env.setUnd = function () {
    $env.barber = undefined;
};