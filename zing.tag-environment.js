(function () {
    zing.TagEnvironment = function ($tag, $guid, $html, $jstemplate) {
        var $env = {},
            $intervalfn = [],
            $interval = setInterval(function () {
                $intervalfn.forEach(function (fn) {
                    fn()
                })
            }, 100);

        function parseExpression(exp) {
            return exp.split('$$').join('$env.');
        }

        //pre
        function $link() {
            $intervalfn.push(function () {
                var ar = zing.getUnder($tag, '_link');
                if (ar)
                    ar.forEach(function (ele) {
                        if (ele.innerHTML !== eval(parseExpression(ele.attributes.link.value)))
                            ele.innerHTML = eval(parseExpression(ele.attributes.link.value));
                    })
            });
        }

        function $bind() {
            $intervalfn.push(function () {
                var ar = zing.getUnder($tag, '_bind');
                if (ar)
                    ar.forEach(function (ele) {
                        if ($env[ele.attributes.bind.value] !== ele.value)
                            $env[ele.attributes.bind.value] = ele.value;
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
                var ar = zing.getUnder($tag, '_if')
                if (ar)
                    ar.forEach(function (ele) {
                        if (!eval(parseExpression(ele.attributes.if.value)))
                            toTemplate(ele, parseExpression(ele.attributes.if.value));
                    });
                templates.forEach(function (template) {
                    if (eval(template.fn)) {
                        template.temp.parentElement.replaceChild(template.ele, template.temp);
                        templates.splice(templates.indexOf(template), 1);
                    }
                });
            })
        }

        function $for() {
            $intervalfn.push(function () {
                zing.getUnder($tag, '_for').forEach(function (ele) {
                    var variableName;
                    var arName;

                });
            })
        }

        //post
        function $click() {
            var ar = zing.getUnder($tag, '_click');
            if (ar)
                ar.forEach(function (ele) {
                    ele.addEventListener('click', function () {
                        eval(parseExpression(ele.attributes.click.value));
                    })
                });
        }

        function post() {
            $click();
        }

        function start() {
            $link();
            $bind();
            $if();
            eval($jstemplate);
            $click();
        }

        function stop(){
            clearInterval($interval);
        }

        return {
            start: start,
            post: post,
            stop: stop
        };
    }

}());