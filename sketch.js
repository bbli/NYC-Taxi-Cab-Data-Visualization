let mapimg;
let easycam;
let zoom =1;
let table;

function preload(){
	table = loadTable('trial_data.csv','csv','header');
}

function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);
	//mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-122.43251,37.77072,15,0,45/600x600?access_token=pk.eyJ1IjoiYmJsaSIsImEiOiJjamVjYXJsMGUwaHluMzNvZDE4MmkxYW40In0.AWDPnfoCzeVRY78xDLyjTQ');
	//mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/cj5l80zrp29942rmtg0zctjto/static/-122.44482,37.75831,11.6,0,0/700x600?access_token=pk.eyJ1IjoiYmJsaSIsImEiOiJjamVjYXJsMGUwaHluMzNvZDE4MmkxYW40In0.AWDPnfoCzeVRY78xDLyjTQ');
    
	easycam = createEasyCam();
    let system = new DatapointSystem(table);
    console.log(system);

}

function draw() {
	background(0);
	push();
	//texture(mapimg);
	//rotateX(PI/2);
	plane(800,600);
	pop();
}

