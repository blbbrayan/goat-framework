(function (zing) {

    var router = {
        currentTag: undefined,
        routes: {},
        addRoute: function (path, tagName) {
            zing.router.routes[path] = tagName
        },
        el: null,
        load: function () {
            var router = zing.router;
            // Lazy load view element:
            router.el = router.el || zing.get('router');
            // Current route url (getting rid of '#' in hash as well):
            var url = location.hash.slice(1) || '/';
            // Get route by url:
            var route = router.routes[url];
            // Do we have both a view and a route?
            if (router.el && route) {
                if (router.currentTag)
                    zing.stopTag(router.currentTag);
                router.currentTag = zing.createTag(route, router.el);
            }
        },
        start: function () {
            window.addEventListener('hashchange', zing.router.load);
            window.addEventListener('load', zing.router.load);
            zing.router.load();
        }
    };

    zing.extend({router: router});

})(window.zing);