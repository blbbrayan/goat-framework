(function (zing) {

    var _modules = {};

    function _removeComments(str) {
        return str.replace('(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|(//.*)');
    }

    function _generateGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function _loadModule(moduleName, callback) {
        var module = _modules[moduleName];
        if (module === undefined) {
            zing.http.get(zing.moduleDir + '/' + moduleName + '.js', function (er, data) {
                var fn = '(function(){ var module; ' + _removeComments(data) + ' return module;})()';
                _modules[moduleName] = eval(fn);
            });
        }
        callback();
    }

    function createTag(tagName, ele, modules, callback) {
        modules = modules || [];
        var env = {};
        if (!(ele instanceof HTMLElement)) {
            ele = ele || window.event;
            ele = ele.target;
        }

        var path = zing.tagDir + "/" + tagName + "/" + tagName,
            eleGuid = _generateGuid();
        ele.dataset.guiId = eleGuid;

        function loadTemplate(onLoaded) {
            zing.http.get(path + '.html', function (er, data) {
                env.$html = (ele.innerHTML + "").replace(/\r?\n|\r/g);
                ele.innerHTML = data;
                onLoaded();
            });

            env.template = path + '.html';
        }

        function loadCSS() {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = path + ".css";
            ele.appendChild(link);
            env.css = path + '.css';
        }

        function loadModules(callback) {
            var i = 0;
            modules.forEach(function (module) {
                _loadModule(module, function () {i++});
            });
            var interval = setInterval(function () {
                if(i === modules.length){
                    clearInterval(interval);
                    callback();
                }
            })
        }

        function loadScript() {
            zing.http.get(path + '.js', function (er, data) {
                if (er)
                    return console.error('Zing: error loading ' + tagName + '.js\n', data);
                var tag = zing.TagEnvironment(zing.get('%' + eleGuid), eleGuid, env.$html, _removeComments(data), _modules);
                env.tag = tag;
                tag.start();
                if (callback)
                    callback();
            });

            env.script = path + '.js';
        }

        function finishLoad() {
            var item = document.createElement("img");
            item.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            item.onload = function () {
                loadCSS();
                loadModules(loadScript);
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

    function stopTag(env) {
        env.tag.stop();
    }

    function stopModule(moduleName) {
        delete _modules[moduleName];
    }

    zing.extend({
        createTag: createTag,
        stopTag: stopTag,
        stopModule: stopModule
    });

})(window.zing);
