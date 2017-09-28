$env.toDocs = function(){
    window.open('#/documentation', '_self');
};
setTimeout(function(){
    $env.barber = zing.cache('barber');
    console.log($env);
}, 500);
