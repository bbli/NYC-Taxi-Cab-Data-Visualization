//class Datapoint {

	//constructor(pickup,dropoff,payment,timediff){
		//this.pickup = pickup;
		//this.dropoff = dropoff;
		//this.payment = payment;
        //this.timediff = timediff;
    //}
//}

const Datapoint = function (pickup, dropoff,payment, timediff){
    return {
        pickup: pickup,
        dropoff: dropoff,
        payment: payment,
        timediff: timediff,
    }
}

const DatapointSystem = function (table){
    // Sets up the datapoints with their longitude and latitude mapped
    this.datapoints = [];

    var rows = table.getRowCount();
    console.log('Row count is :'+rows);
    for (var i = 0 ; i < rows; i++) {
        var payment = table.getNum(i,5);
        var timediff = table.getNum(i,6);
        var pickup = [table.getNum(i,1), table.getNum(i,2)];
        var dropoff = [table.getNum(i,3),table.getNum(i,4)];
        this.datapoints[i] = Datapoint(pickup,dropoff,payment,timediff);   
    }
    projectWorldCoordinates(this.datapoints);
}




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
