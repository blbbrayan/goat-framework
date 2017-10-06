(function(zing){

    zing.router.addRoute('/', 'home', ["data"]);
    zing.router.addRoute('/home', 'home');
    zing.router.addRoute('/other', 'other');

    zing.router.start();

})(window.zing);