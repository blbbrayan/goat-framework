(function(zing){

    zing.router.addRoute('/', 'home');
    zing.router.addRoute('/home', 'home');
    zing.router.addRoute('/todo', 'todo');
    zing.router.addRoute('/documentation', 'documentation');

    zing.router.start();

})(window.zing);