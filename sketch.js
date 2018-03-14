//User defined
let system;
let gui;
let g_toggle_top_map =true;

//Setup
let mapimg;
let easycam;
let table;
let colorbar;
let wallpaper;

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
    mapimg = loadImage('./data/map.png');
    wallpaper = loadImage('./data/traffic1.jpg');
}

function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);

    
    var state = {
        distance: 950,
        center: [0,0,0],
        //rotation: [0.794139069590646, 0.6032586662637968, 0.03584418452263494, -0.06432195708491893]
        rotation : [1,0,0,0]
    }
    //inserting state here does not work for some reason.
    // As you can see, I had to manually set the inital and reset states.
    easycam = createEasyCam(p5.RendererGL,state);
    easycam.setDistanceMax(1500);
    easycam.setState(state);
    easycam.state_reset = state;
    //easycam = createEasyCam();
    system = new DatapointSystem(table);

    gui = new Gui(system);
}

function draw() {
    background(200);
    //background(wallpaper);
    system.plot();

    texture(mapimg);
    plane(g_plane_resolution[0],g_plane_resolution[1]);


    if (g_toggle_top_map){

        push();
        translate(0,0,g_z_offset);
        plane(g_plane_resolution[0],g_plane_resolution[1]);
        pop();
    }

    gui.displayTitle();

  ////////////////////////////////////////////////////////////////////////////
}

