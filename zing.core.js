window.zing = {};

(function () {
    window.zing.isLoaded = function (url) {
        return Array.from(document.getElementsByTagName("script")).find(function (script) {return script.src === url}) !== undefined;
    };

    window.zing.loadScript = function (url, callback) {
        if (zing.isLoaded(url))
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
                window.zing.loaded++;
            };
            script.onload = function () {
                if (callback)
                    callback();
                window.zing.loaded++;
            };

            // Fire the loading
            head.appendChild(script);
        }
    };

    var core = Array.from(document.getElementsByTagName("script")).find(function (script){
        return script.src.includes('zing.core.js');
    });

    zing.tagsDir = core['attributes']['tags-dir'].value;

    var prefix = core.outerHTML;
    prefix = prefix.substr(prefix.indexOf('src="')+5, prefix.indexOf('zing.core.js"')-13);


    var loaded = 0;
    var reqScripts = [
      "tag-environment"
    ];
    var engineScripts = [
        "broadcast",
        "cache",
        "gui",
        "http",
        "routing",
        "tag"
    ];
    function loadScripts(ar){
        ar.map(function (script){
            return prefix+"zing."+script+".js";
        }).forEach(function (script){
            window.zing.loadScript(script, function (){loaded++})
        });
    }
    loadScripts(reqScripts);

    var reqScriptListener = setInterval(function(){
        if(loaded === reqScripts.length){
            clearInterval(reqScriptListener);
            loaded = 0;
            loadScripts(engineScripts);
            var scriptListener = setInterval(function(){
                if(loaded === engineScripts.length){
                    clearInterval(scriptListener);
                    start();
                }
            }, 100);
        }
    }, 100);

    function start (){
        var items = zing.get("_zing");
        items.forEach(function (item){
           zing.createTag(item.localName, item);
        });
        if(zing.get('router'))
            zing.router();
    }

}());