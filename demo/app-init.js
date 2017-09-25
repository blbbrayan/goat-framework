(function(zing){

    zing.router.addRoute('/', 'home');
    zing.router.addRoute('/home', 'home');
    zing.router.addRoute('/todo', 'todo');
    zing.router.addRoute('/documentation', 'documentation');

    zing.router.start();

    //barber info
    var barber = {
        name: "Joseph",
        phone: "678-999-8212",
        address: "1600 Pennsylvania Ave NW, Washington, DC 20500"
    };

    zing.cache('barber', barber);

})(window.zing);