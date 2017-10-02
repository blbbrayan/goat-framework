(function(zing){
    'use strict';

    var utilities = {
        getElem: function(tagName) {
            return document.getElementsByTagName(tagName);
        },
        createElem: function(name) {
            document.createElement(name);
        }
    };

    zing.extend({util: utilities});
})(window.zing);