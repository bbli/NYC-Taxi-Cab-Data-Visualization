function projectWorldCoordinates(datapoints,origin){
    // Projects longitude and latitude to
    // world mercator coordinates
    // and then translates them with respect to the origin.
    let projected_origin = project(origin,g_zoom);
    for (let point of datapoints){
        point.pickup = project(point.pickup,g_zoom);
        point.pickup[0]= point.pickup[0]-projected_origin[0];
        point.pickup[1]= point.pickup[1]-projected_origin[1];

        point.dropoff = project(point.dropoff,g_zoom);
        point.dropoff[0]= point.dropoff[0]-projected_origin[0];
        point.dropoff[1]= point.dropoff[1]-projected_origin[1];
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
