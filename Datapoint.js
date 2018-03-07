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
}

Datapoint.prototype.plot = function(idk) {
   
    let mapped_payment = map(this.payment,0,g_max_payment,100,500);
    let c = colorbar.get(mapped_payment, colorbar.height/2);
    push();
    stroke(c);
    strokeWeight(3);
    line(this.pickup[0],this.pickup[1],30,this.dropoff[0],this.dropoff[1],30+100);
    pop();
};


const DatapointSystem = function (table){
    // Sets up the datapoints with their longitude and latitude mapped
    this.datapoints = [];

    var rows = table.getRowCount();
    console.log('Row count is :'+rows);
    for (let i = 0 ; i < rows; i++) {
        var payment = table.getNum(i,5);
        var timediff = table.getNum(i,6);
        var pickup = [table.getNum(i,1), table.getNum(i,2)];
        var dropoff = [table.getNum(i,3),table.getNum(i,4)];
        this.datapoints[i] = new Datapoint(pickup,dropoff,payment,timediff);   
    }
    projectWorldCoordinates(this.datapoints,g_origin);
}

DatapointSystem.prototype.plot = function(idk) {
    //for (let point of this.datapoints){
        //point.plot();
    //}
    for (let i=0; i<500; i++){
        this.datapoints[i].plot();
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
