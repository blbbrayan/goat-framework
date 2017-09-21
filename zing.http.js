(function () {

    function get(url, callback){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(undefined, xhr.responseText);
                } else {
                    callback(xhr.statusText);
                }
            }
        };
        xhr.onerror = function (e) {
            callback(xhr.statusText);
        };
        xhr.send(null);
    }

    window.zing.httpGet = get;

})();