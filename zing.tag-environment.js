(function () {
    zing.TagEnvironment = function ($tag, $guid, $html, $jstemplate) {
        var $env = {}, 
            $private = {for:[]},
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

            //for element to watch if the loop changes
            //ar.length amount of ele inside the for
            //replace $: with $[todos:1].variableName

                zing.getUnder($tag, '_for').forEach(function (ele) {
                    var elemArray = ele.attributes.for.value.split(':');
                    var arrName = elemArray[0];
                    var variableName = elemArray[1];

                    var forEle = document.createElement('for');
                    ele.parentElement.replaceChild(forEle, ele);
                    var arr = $env[arrName];
                    $private.for[arrName] = arr;
                    
                    arr.forEach(function (item, i){
                        var clone = ele.cloneNode(true);
                        clone.removeAttribute('for');
                        Array.from(clone.attributes).forEach(function(attr){
                            attr.value = attr.value.split('$:'+variableName).join('$$'+arrName+'['+ i +']');
                        })
                        forEle.appendChild(clone);
                    });

                });
        }

        //post
        function $click() {
            var ar = zing.getUnder($tag, '_click');
            if (ar)
                ar.forEach(function (ele) {
                    function handleClick () {
                        eval(parseExpression(ele.attributes.click.value));
                    }
                    ele.removeEventListener('click', handleClick);
                    ele.addEventListener('click', handleClick);
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
            $for();
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