(function (global) {
    //object extender for other zing methods
    Object.prototype.extend = function (obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                this[i] = obj[i];
            }
        }
    };

    var core = Array.from(document.getElementsByTagName("script")).find(function (script) {
        return script.src.includes('zing.core.js');
    });

    var prefix = core.outerHTML;
    prefix = prefix.substr(prefix.indexOf('src="') + 5, prefix.indexOf('zing.core.js"') - 13);

    var loaded = 0;
    var reqScripts = [
        "http",
        "tag-environment"
    ];
    var engineScripts = [
        "broadcast",
        "cache",
        "gui",
        "tag",
        "routing"
    ];

    var zing = {
        loaded: 0,
        tagsDir: core['attributes']['tags-dir'].value,
        init: core['attributes']['init'].value,
        isLoaded: function (url) {
            return Array.from(document.getElementsByTagName("script")).find(function (script) {
                return script.src === url
            }) !== undefined;
        },
        loadScript: function (url, callback) {
            if (this.isLoaded(url))
                callback();
            else {
                // Adding the script tag to the head as suggested before
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;

                // Then bind the event to the callback function.
                // There are several events for cross browser compatibility.
                script.onreadystatechange = function () {
                    if (callback)
                        callback();
                    zing.loaded++;
                };
                script.onload = function () {
                    if (callback)
                        callback();
                    zing.loaded++;
                };

                // Fire the loading
                head.appendChild(script);
            }
        }
    };

    function loadScripts(ar) {
        ar.map(function (script) {
            return prefix + "zing." + script + ".js";
        }).forEach(function (script) {
            zing.loadScript(script, function () {
                loaded++
            })
        });
    }
    loadScripts(reqScripts);

    var reqScriptListener = setInterval(function () {
        if (loaded === reqScripts.length) {
            clearInterval(reqScriptListener);
            loaded = 0;
            loadScripts(engineScripts);
            var scriptListener = setInterval(function () {
                if (loaded === engineScripts.length) {
                    clearInterval(scriptListener);
                    start();
                }
            }, 100);
        }
    }, 100);

    function start() {
        var items = zing.get("_zing") || [];
        items.forEach(function (item) {
            zing.createTag(item.localName, item);
        });
        zing.loadScript(zing.init, function () {});
    }

    global.zing = zing;

}(window));