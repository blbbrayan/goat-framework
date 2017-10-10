//barber info
var barbers = [{
    name: "Joseph",
    phone: "678-999-8212",
    address: "1600 Pennsylvania Ave NW, Washington, DC 20500"
}, {
    name: "Chuck",
    phone: "678-999-8212",
    address: "1600 Pennsylvania Ave NW, Washington, DC 20500"
}, {
    name: "Dave",
    phone: "678-999-8212",
    address: "1600 Pennsylvania Ave NW, Washington, DC 20500"
}];

function clearBarbers () {
    barbers.forEach(function (barber) {
        barber.name = barber.name.split('t').join('')
    })
}

setInterval(function () {
    barbers.forEach(function (barber) {
        barber.name += 't';
    })
}, 3000);

//module is the returned object
module = {
    barbers: barbers,
    clearBarbers: clearBarbers
};