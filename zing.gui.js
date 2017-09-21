(function () {
    function get(selector) {
        if (selector.includes("#"))
            return document.getElementById(selector.replace("#", ""));

        if (selector.includes("."))
            return Array.from(document.getElementsByClassName(selector));

        if (selector.includes("%"))
            return Array.from(document.querySelectorAll("[data-gui-id='" + selector.substr(1) + "']"))[0];

        if (selector.includes("_"))
            return Array.from(document.querySelectorAll("[" + selector.substr(1) + "]"));

        var ar = Array.from(document.getElementsByTagName(selector));
        if(ar.length <= 1)
            return ar[0];
        return ar;
    }

    function each(selector, fn) {
        var elements = get(selector);
        elements.forEach(fn);
        return elements;
    }

    function forEach(elements, fn) {
        elements.forEach(fn);
        return elements;
    }

    function under(element) {
        return Array.from(element.children);
    }

    function allUnder(element) {
        return Array.from(element.querySelectorAll('*'));
    }

    function getUnder(element, selector, strict) {
        if (element) {
            var elements = strict ? under(element) : allUnder(element),
                specialChar = selector.substr(0, 1),
                item = selector.substr(1);
            if (specialChar === "#")
                return elements.find(function (ele) {
                    return ele.id === item;
                });
            if (specialChar === ".")
                return elements.filter(function (ele) {
                    return ele.className.includes(item);
                });
            if (specialChar === "%")
                return elements.find(function (ele) {
                    return ele.dataset["gui-id"] === item;
                });
            if (specialChar === "_")
                return Array.from(element.querySelectorAll("[" + selector.substr(1) + "]"));

            return elements.filter(function (ele) {
                return ele.tagName.toLowerCase() == selector;
            });
        }
    }

    window.zing = Object.assign(window.zing, {
        get: get,
        each: each,
        forEach: forEach,
        under: under,
        getUnder: getUnder,
        allUnder: allUnder
    });

})();