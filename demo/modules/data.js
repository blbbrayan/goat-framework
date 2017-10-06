function _handleError(er){
    if(er)
        console.error(er);
    return er === undefined;
}

function getQuartiles(callback){
    zing.http.get('assets/data.json', function(er, data){
        if(_handleError(er))
            callback(JSON.parse(data));
    });
}

//module is the returned object
module = {
    title: "Home",
    getQuartiles: getQuartiles
};