function projectWorldCoordinates(datapoints){
    // Projects longitude and latitude to
    // world mercator coordinates
    for (let point of datapoints){
        let temp_pickup= point.pickup.slice();
        assert(temp_pickup.length == 2, "pickup Array needs to have length of 2!");
        point.pickup = project(temp_pickup,g_zoom);

        let temp_dropoff= point.dropoff.slice();
        assert(temp_dropoff.length == 2, "dropoff Array needs to have length of 2!");
        point.dropoff = project(temp_dropoff,g_zoom);
    }
}
////////////////////////////////////////////////////////////////////////////

function project(array,zoom){
    let x = mercX(array[0],zoom);
    let y = mercY(array[1],zoom);
    return [x, y];
}

function mercX(lon, zoom) {
	lon = radians(lon);
	var a = (256 / PI) * pow(2, zoom);
	var b = lon + PI;
	return a * b;
}

function mercY(lat,zoom) {
	lat = radians(lat);
	var a = (256 / PI) * pow(2, zoom);
	var b = tan(PI / 4 + lat / 2);
	var c = PI - log(b);
	return a * c;
}
////////////////////////////////////////////////////////////////////////////


function assert(condition, message){
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}
