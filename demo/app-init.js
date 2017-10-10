(function (zing) {

    zing.router.addRoute('/', 'home', ['data']);
    zing.router.addRoute('/home', 'home', ['data']);
    zing.router.addRoute('/todo', 'todo', ['data']);
    zing.router.addRoute('/documentation', 'documentation', ['data']);

    zing.router.start();

})(window.zing);