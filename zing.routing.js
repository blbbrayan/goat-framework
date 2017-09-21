(function () {

    zing.currentTag = undefined;

// A hash to store our routes:
    zing.routes = {};
//
    zing.route = function (path, tagName) {
        zing.routes[path] = tagName
    };
    var el = null;
    zing.router = function () {
        // Lazy load view element:
        el = el || zing.get('router');
        // Current route url (getting rid of '#' in hash as well):
        var url = location.hash.slice(1) || '/';
        console.log('url', url);
        // Get route by url:
        var route = zing.routes[url];
        console.log(route, zing.routes);
        // Do we have both a view and a route?
        if (el && route) {
            if (zing.currentTag)
                zing.stopTag(zing.currentTag);
            zing.currentTag = zing.createTag(route, el);
        }
    };
// Listen on hash change:
    window.addEventListener('hashchange', zing.router);
// Listen on page load:
    window.addEventListener('load', zing.router);

    zing.route('/', 'home');
    zing.route('/home', 'home');
    zing.route('/about', 'about');

})();