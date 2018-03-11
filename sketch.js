//User defined
let system;
let gui;

//Setup
let mapimg;
let easycam;
let table;
let colorbar;

//Data
let g_zoom = 10.6;
let g_origin=[-73.92756,40.75318];
//g_plane_resolution controls the size of the image we get from mapbox
//and the plane we create
let g_plane_resolution= [1024,1024];
let g_payment_cutoff = 75;
let g_time_cutoff = 90;//Still need to use this to map curve tightness
let g_z_offset = 200;


function preload(){
    table = loadTable('trial_data.csv','csv','header');
    colorbar = loadImage('colormapManip_14.png')
}

function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);

    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/light-v9/static/'
        +g_origin[0]+','+g_origin[1]+','+g_zoom+',0,0/'+g_plane_resolution[0]+'x'+g_plane_resolution[1]+
        '?access_token=pk.eyJ1IjoiYmJsaSIsImEiOiJjamVjYXJsMGUwaHluMzNvZDE4MmkxYW40In0.AWDPnfoCzeVRY78xDLyjTQ');
    
    easycam = createEasyCam(p5.RendererGL,{distance:2500});
    //easycam = createEasyCam();
    system = new DatapointSystem(table);

}

function draw() {
	background(200);

    system.plot();

    texture(mapimg);
    plane(g_plane_resolution[0],g_plane_resolution[1]);


    push();
    translate(0,0,g_z_offset);
    plane(g_plane_resolution[0],g_plane_resolution[1]);
    pop();

  ////////////////////////////////////////////////////////////////////////////
    system.plot();
}

