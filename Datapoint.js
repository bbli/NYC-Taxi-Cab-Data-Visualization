//class Datapoint {

	//constructor(pickup,dropoff,payment,timediff){
		//this.pickup = pickup;
		//this.dropoff = dropoff;
		//this.payment = payment;
        //this.timediff = timediff;
    //}
//}

const Datapoint = function (pickup, dropoff,payment, timediff){
    this.pickup = pickup;
    this.dropoff = dropoff;
    this.payment = payment;
    this.timediff = timediff;

    this.c1 = control1(pickup,dropoff,1);
    this.c2 = control2(pickup,dropoff,1);

    this.curve = sq(map(timediff,0,g_time_cutoff,4,8));
    this.c = getColor(colorbar,payment);

    this.show = true;

    //this.temp_payment = payment;
    //this.temp_timediff = timediff;
}

/////////////////////Setup Functions////////////////////////
function control1(pickup,dropoff,strength){
    return [strength*dropoff[0]/2-pickup[0]/2,strength*dropoff[1]/2-pickup[1]/2,-2*strength*g_z_offset];
}

function control2(pickup,dropoff,strength){
    return [strength*2*dropoff[0]-pickup[0],strength*2*dropoff[1]-pickup[1],-1*strength*g_z_offset];
}

function getColor(colorbar,payment){
    let mapped_payment = map(payment,0,g_payment_cutoff,100,500);
    //return colorbar.get(this.mapped_payment, colorbar.height/2);
    return colorbar.get(mapped_payment,210);
}
////////////////////////////////////////////////////////////////////////////

Datapoint.prototype.plot = function(idk) {
   
    if (this.show){
        push();
        fill(255,10);
        //Turn on when I use p5 manager
        stroke(this.c);
        //stroke(0);
        strokeWeight(3);
        //line(this.pickup[0],this.pickup[1],0,this.dropoff[0],this.dropoff[1],g_z_offset);
        curveTightness(this.curve);
        drawCurve(this.c1,this.pickup,this.dropoff,this.c2);
        pop();

    }
};

Datapoint.prototype.setShow = function(low_payment,high_payment,low_time,high_time, pickup_location, pickup_radius,dropoff_location,dropoff_radius) {
    var a = (low_payment<this.payment);
    var b = (high_payment>this.payment);
    var c = (low_time<this.timediff);
    var d = (high_time>this.timediff);
    
    var slider_bool = (a&&b&&c&&d);
    var pickup_bool = inDistance(this.pickup,pickup_location,pickup_radius)
    var dropoff_bool = inDistance(this.dropoff,dropoff_location,dropoff_radius)
    var bool = (slider_bool&&pickup_bool&&dropoff_bool);
    this.show = bool;
};


/////////////////////Helper Functions////////////////////////

function drawCurve(c1,pickup,dropoff,c2) {
    curve(c1[0],c1[1],c1[2],pickup[0],pickup[1],0,dropoff[0],dropoff[1],g_z_offset,c2[0],c2[1],c2[2]);
};

function inDistance(first_location, second_location,radius){
    var deltaX = first_location[0]-second_location[0];
    var deltaY = first_location[1]-second_location[1];
    var distance = sqrt(deltaX*deltaX + deltaY*deltaY);
    return (distance<radius)
}
////////////////////////////////////////////////////////////////////////////


const DatapointSystem = function (table){
    // Sets up the datapoints with their longitude and latitude mapped
    this.datapoints = [];

    var rows = table.getRowCount();
    console.log('Row count is :'+rows);
    for (let i = 0 ; i < 2500; i++) {
        var payment = table.getNum(i,5);
        var timediff = table.getNum(i,6);
        var pickup = [table.getNum(i,1), table.getNum(i,2)];
        var dropoff = [table.getNum(i,3),table.getNum(i,4)];
        this.datapoints[i] = new Datapoint(pickup,dropoff,payment,timediff);   
    }
    projectWorldCoordinates(this.datapoints,g_origin);
}

DatapointSystem.prototype.plot = function(idk) {
    for (let point of this.datapoints){
        point.plot();
    }
};

DatapointSystem.prototype.filterDisplay = function() {
    //Get values from the GUI's
    //var values_list = g_maingui.values_list;
    //var pickup_location = g_pickupgui.location();
    //var pickup_radius = g_pickupgui.radius;
    //var dropoff_location = g_dropoffgui.location();
    //var dropoff_radius = g_dropoffgui.radius;
    //for (let point of this.datapoints){
        //point.setShow(...values_list,pickup_location,pickup_radius,dropoff_location,dropoff_radius);
    //}
    var values_list = g_maingui.values_list();
    var ok = checkRanges(...values_list);
    if (ok){
        var pickup_location = g_pickupgui.location();
        var pickup_radius = g_pickupgui.radius;
        var dropoff_location = g_dropoffgui.location();
        var dropoff_radius = g_dropoffgui.radius;
        for (let point of this.datapoints){
            point.setShow(...values_list,pickup_location,pickup_radius,dropoff_location,dropoff_radius);
        }
    }
};




//class DatapointSystem {
    //constructor(table){
        //this.datapoints = [];
        //let rows = table.getRowCount();
        //console.log('Row count is :'+rows);
        //for (var i = 0 ; i < rows; i++) {
            //let payment = table.getNum(i,5);
            //let timediff = table.getNum(i,6);
            //let pickup = [table.getNum(i,1), table.getNum(i,2)];
            //let dropoff = [table.getNum(i,3),table.getNum(i,4)];

            //this.datapoints[i] = new Datapoint(pickup,dropoff,payment,timediff);   
        //}
    //}
//}
