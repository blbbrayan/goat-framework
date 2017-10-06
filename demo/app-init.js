(function(zing){

    zing.router.addRoute('/', 'home', ['data']);
    zing.router.addRoute('/home', 'home', ['data']);
    zing.router.addRoute('/todo', 'todo', ['data']);
    zing.router.addRoute('/documentation', 'documentation', ['data']);

    zing.router.start();

    //barber info
    var barber = {
        name: "Joseph",
        phone: "678-999-8212",
        address: "1600 Pennsylvania Ave NW, Washington, DC 20500"
    };

    setInterval(function () {
        barber.name+='t';
    }, 3000);

    zing.events.subscribe('clear-barber', function () { barber.name = barber.name.split('t').join('') });

    zing.snap('barber').watch(barber);

})(window.zing);