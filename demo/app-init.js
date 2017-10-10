(function (goat) {

    goat.router.addRoute('/', 'home', ['data']);
    goat.router.addRoute('/home', 'home', ['data']);
    goat.router.addRoute('/todo', 'todo', ['data']);
    goat.router.addRoute('/documentation', 'documentation', ['data']);

    goat.router.start();

})(window.goat);