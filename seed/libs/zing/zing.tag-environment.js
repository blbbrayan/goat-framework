(function (zing) {
    zing.TagEnvironment = function ($tag, $guid, $html, $jstemplate) {
        var $env = {}, $private = {},
            $intervalfn = [],
            $interval = setInterval(function () {
                $intervalfn.forEach(function (fn) {
                    fn()
                })
            }, 100);

        function parseExpression(exp) {
            exp = exp || "";
            if (exp.includes("$:"))
                return "";
            return exp.split('$$').join('$env.');
        }

        function getUnderEnvBy(attr) {
            return zing.filterByAttribute((zing.getUnderEnv($tag) || []), attr);
        }

        //pre
        function $link() {
            $intervalfn.push(function () {
                var ar = getUnderEnvBy('link');
                ar.forEach(function (ele) {
                    if (ele.innerText !== eval(parseExpression(ele.getAttribute('link'))))
                        ele.innerText = eval(parseExpression(ele.getAttribute('link')));
                })
            });
        }

        function $bind() {
            $intervalfn.push(function () {
                var ar = getUnderEnvBy('bind');
                ar.forEach(function (ele) {
                    if ($env[ele.getAttribute('bind')] !== ele.value)
                        $env[ele.getAttribute('bind')] = ele.value;
                })
            });
        }

        function $if() {
            var templates = [];

            function toTemplate(ele, fn) {
                var temp = document.createElement('if');
                templates.push({temp: temp, ele: ele, fn: fn});
                ele.parentElement.replaceChild(temp, ele);
            }

            $intervalfn.push(function () {
                var ar = getUnderEnvBy('if');
                ar.find(function (ele) {
                    if (!eval(parseExpression(ele.getAttribute('if')))) {
                        toTemplate(ele, parseExpression(ele.getAttribute('if')));
                        return true;
                    }
                });
                templates.forEach(function (template) {
                    if (eval(template.fn)) {
                        template.temp.parentElement.replaceChild(template.ele, template.temp);
                        templates.splice(templates.indexOf(template), 1);
                        update();
                    }
                });
            })
        }

        function $for() {

            var watchers = [];

            function createClone(ele, forEle, varName, arrName, i, clones) {
                var clone = ele.cloneNode(true);
                clone.removeAttribute('for');
                var allEle = zing.allUnder(clone);
                allEle.push(clone);
                allEle.forEach(function (e) {
                    Array.from(e.attributes).forEach(function (attr) {
                        attr.value = attr.value.split('$:' + varName).join('$$' + arrName + '[' + i + ']');
                    });
                });
                forEle.appendChild(clone);
                clones.push(clone);
                update();
            }

            $intervalfn.push(function () {
                getUnderEnvBy('for').forEach(function (ele) {
                    var elemArray = ele.getAttribute('for').split(':'),
                        arrName = elemArray[0],
                        variableName = elemArray[1],
                        forEle = document.createElement('for');
                    ele.parentElement.replaceChild(forEle, ele);

                    watchers.push({ele: ele, forEle: forEle, arrName: arrName, varName: variableName, clones: []});
                });
                watchers.forEach(function (watcher) {
                    var ar = $env[watcher.arrName];
                    if (ar) {
                        while (watcher.clones.length < ar.length)
                            createClone(watcher.ele, watcher.forEle, watcher.varName, watcher.arrName, watcher.clones.length, watcher.clones);
                        while (watcher.clones.length > ar.length) {
                            var target = watcher.clones[watcher.clones.length - 1];
                            watcher.clones.splice(watcher.clones.indexOf(target), 1);
                            target.remove();
                        }
                    }
                });
            });
        }

        function handleClick(ele) {
            return function (event){
                eval(parseExpression(ele.getAttribute('click')));
            }
        }

        //post
        function $click() {
            var ar = getUnderEnvBy('click');
            if($private.click)
                $private.click.forEach(function (click) {
                    if(click.ele)
                        click.ele.removeEventListener('click', click.fn);
                });
            $private.click = [];
            ar.forEach(function (ele) {
                var fn = handleClick(ele);
                ele.addEventListener('click', fn);
                $private.click.push({fn: fn, ele: ele});
            });
        }

        function update() {
            $click();
        }

        function start() {
            $for();
            $if();
            $link();
            $bind();
            eval($jstemplate);
            update();
        }

        function stop() {
            clearInterval($interval);
        }

        return {
            start: start,
            update: update,
            stop: stop
        };
    }
})(window.zing);