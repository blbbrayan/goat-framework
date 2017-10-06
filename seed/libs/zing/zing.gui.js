(function (zing) {

    var gui = {
        get: function (selector) {
            if (selector.includes("#"))
                return document.getElementById(selector.replace("#", ""));

            if (selector.includes("."))
                return Array.from(document.getElementsByClassName(selector.substr(1)));

            if (selector.includes("%"))
                return Array.from(document.querySelectorAll("[data-gui-id='" + selector.substr(1) + "']"))[0];

            if (selector.includes("_"))
                return Array.from(document.querySelectorAll("[" + selector.substr(1) + "]"));

            var ar = Array.from(document.getElementsByTagName(selector));
            if (ar.length === 1)
                return ar[0];
            return ar;
        },
        under: function (element) {
            return Array.from(element.children);
        },
        allUnder: function (element) {
            return Array.from(element.querySelectorAll('*'));
        },
        getUnder: function (element, selector, strict) {
            if (element) {
                var elements = strict ? this.under(element) : this.allUnder(element),
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
        },
        getUnderEnv: function (element, includeZing) {
            includeZing = includeZing || true;
            if (element) {
                var ar = [],
                    children = Array.from(element.children);

                function getChildren() {
                    var childAr = [];
                    children.forEach(function (child) {
                        if(child.hasAttribute('zing')){
                             children.splice(children.indexOf(child), 1);
                            if(includeZing)
                                ar.push(child);
                        } else
                            childAr = childAr.concat(Array.from(child.children))
                    });
                    ar = ar.concat(children);
                    children = childAr;
                    if (children.length > 0)
                        return getChildren();
                    else
                        return ar;
                }

                return getChildren();
            }
        },
        filterByAttribute: function (ar, attr) {
            return ar.filter(function (ele) {
                return ele.hasAttribute(attr);
            });
        }
    };

    zing.extend(gui);

})(window.zing);