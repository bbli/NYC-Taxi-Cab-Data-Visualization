////////////////////////////////////////////////////////////////////////////
function projectWorldCoordinates(datapoints,origin){
    // Projects longitude and latitude to
    // world mercator coordinates
    // and then translates them with respect to the origin.
    let projected_origin = project(origin,g_zoom);
    for (let point of datapoints){
        point.pickup = project(point.pickup,g_zoom);
        point.pickup = originTranslate(point.pickup,projected_origin);

        point.dropoff = project(point.dropoff,g_zoom);
        point.dropoff = originTranslate(point.dropoff,projected_origin);
    }
}

function project(array,zoom){
    let x = mercX(array[0],zoom);
    let y = mercY(array[1],zoom);
    return [x, y];
}
////////////////////
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
////////////////////

function originTranslate(array, projected_origin){
    x = array[0]-projected_origin[0];
    y = array[1]-projected_origin[1];
    return [x,y]
}

////////////////////////////////////////////////////////////////////////////
//function scaleWorldCoordinates(datapoints){
    //for (let point of datapoints){
        //point.scaled_pickup = upperLeftCoordinates(point.pickup);
        //point.scaled_pickup = scalemap(point.scaled_pickup);
    //}
//}


//function upperLeftCoordinates(array){
    //x=array[0]+g_plane_resolution[0]/2;
    //y=array[1]+g_plane_resolution[1]/2;
    //return [x,y]
//}

////////////////////////////////////////////////////////////////////////////

function assert(condition, message){
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}
