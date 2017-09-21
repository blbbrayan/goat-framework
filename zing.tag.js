(function () {
    window.zing.removeComments = function(str) {
        return str.replace('(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|(//.*)');
    }
}());
(function () {

    window.zing.generateGuid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    function createTag(tagName, ele, callback) {
        var env = {};
        console.log('loading', tagName);
        if (!(ele instanceof HTMLElement)) {
            ele = ele || window.event;
            ele = ele.target;
        }

        var path = zing.tagsDir + "/" + tagName + "/" + tagName,
            eleGuid = zing.generateGuid();
        ele.dataset.guiId = eleGuid;

        function loadTemplate(onLoaded) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", path + ".html", true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    env.$html = (ele.innerHTML + "").replace(/\r?\n|\r/g);
                    ele.innerHTML = xhr.responseText;
                    onLoaded();
                }
            };
            xhr.send(null);
            env.template = path + '.html';
        }

        function loadCSS() {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = path + ".css";
            ele.appendChild(link);
            env.css = path + '.css'
        }

        function loadScript() {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", path + ".js", true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var tag = zing.TagEnvironment(zing.get('%' + eleGuid), eleGuid, env.$html, zing.removeComments(xhr.responseText));
                        env.tag = tag;
                        tag.start();
                        if (callback)
                            callback(ele);
                    } else
                        console.error(xhr.statusText);
                }
            };
            xhr.onerror = function (e) {
                console.error(xhr.statusText);
            };
            xhr.send(null);
            env.script = path + '.js';
        }

        function finishLoad() {
            var item = document.createElement("img");
            item.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            item.onload = function () {
                loadCSS();
                loadScript();
                zing.getUnder(ele, "_zing").forEach(function (e) {
                    createTag(e.localName, e);
                });
                item.parentNode.removeChild(item);
            };
            ele.appendChild(item);
        }

        loadTemplate(finishLoad);

        return env;
    }

    zing.stopTag = function (env){
        env.tag.stop();
        zing.get('link').find(function (link) {
            if(link.href.includes(env.css))
                link.parentElement.removeChild(link);
        });
    };

    zing.createTag = createTag;
})();
