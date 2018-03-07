let mapimg;
let easycam;
let table;
let system;

let g_zoom =9.9;
let g_origin=[-73.99187,40.7288];
//controls the size of the image we get from mapbox
//and the plane we create
let g_plane_resolution= [512,512];


function preload(){
    table = loadTable('trial_data.csv','csv','header');
}

function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);

    //mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/light-v9/static/'
        //+g_origin[0]+','+g_origin[1]+','+g_zoom+',0,0/'+g_plane_resolution[0]+'x'+g_plane_resolution[1]+
        //'?access_token=pk.eyJ1IjoiYmJsaSIsImEiOiJjamVjYXJsMGUwaHluMzNvZDE4MmkxYW40In0.AWDPnfoCzeVRY78xDLyjTQ');
    
	easycam = createEasyCam(p5.RendererGL,{distance:400});
    system = new DatapointSystem(table);
    

}

function draw() {
	background(0);

    push();
    //texture(mapimg);
    plane(g_plane_resolution[0],g_plane_resolution[1]);
    pop();

  ////////////////////////////////////////////////////////////////////////////
}

