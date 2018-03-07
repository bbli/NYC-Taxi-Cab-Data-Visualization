let mapimg;
let easycam;
let table;

let g_zoom =12;
let g_origin=[-122.41351,37.79081];
//controls the size of the image we get from mapbox
//and the plane we create
let g_plane_resolution= [512,512];

let t_mapped_origin;
let t_mapped_sf;
let t_mapped_polk;

function preload(){
	//table = loadTable('trial_data.csv','csv','header');
}

function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);
    //world
    //mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/light-v9/static/0.00000,-0.00000,1,0,0/512x512?access_token=pk.eyJ1IjoiYmJsaSIsImEiOiJjamVjYXJsMGUwaHluMzNvZDE4MmkxYW40In0.AWDPnfoCzeVRY78xDLyjTQ');

    //sf
    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/light-v9/static/'
        +g_origin[0]+','+g_origin[1]+','+g_zoom+',0,0/'+g_plane_resolution[0]+'x'+g_plane_resolution[1]+
        '?access_token=pk.eyJ1IjoiYmJsaSIsImEiOiJjamVjYXJsMGUwaHluMzNvZDE4MmkxYW40In0.AWDPnfoCzeVRY78xDLyjTQ');
    
	easycam = createEasyCam(p5.RendererGL,{distance:400});
    //let system = new DatapointSystem(table);
    
  ////////////////////////////////////////////////////////////////////////////
    // DEBUGGING CODE
    // Purpose: 
    t_mapped_origin = project(g_origin,g_zoom)
    console.log(t_mapped_origin);
    t_mapped_sf = project([-122.407007,37.794003],g_zoom)
    t_mapped_polk = project([-122.420897,37.791527],g_zoom)
  ////////////////////////////////////////////////////////////////////////////

}

function draw() {
	background(0);

    push();
    texture(mapimg);
    plane(g_plane_resolution[0],g_plane_resolution[1]);
    pop();

    // DEBUGGING CODE
    // Purpose: seeing if mercX/mercY work properly
    push();
    translate(t_mapped_sf[0]-t_mapped_origin[0],(t_mapped_sf[1]-t_mapped_origin[1]),30);
    stroke(255,200,200);;
    sphere(5);
    pop();

    push();
    translate(t_mapped_polk[0]-t_mapped_origin[0],(t_mapped_polk[1]-t_mapped_origin[1]),30);
    stroke(255,200,200);;
    sphere(5);
    pop();
  ////////////////////////////////////////////////////////////////////////////
}

