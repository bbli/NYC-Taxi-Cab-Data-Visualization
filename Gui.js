function Slider(max,index,string,start_width,start_height){
    let slider_width = 200
    let slider_seperation = 60;
    let slider_height = 50;
    let offset = 15;

    this.slider = createSlider(0,max,0);
    //This is just for setup. Will replace html element 
    //for every change
    this.value = createP(string+": "+this.slider.value());

    this.slider.position(start_width,start_height+offset+slider_height+(index+1)*slider_seperation)
    this.value.position(slider_width+20+start_width,start_height+offset+slider_height+(index+1)*slider_seperation);
    
    this.slider.size(slider_width,slider_height);
    this.slider.addClass('slider');
    /////////////////////Methods////////////////////////
    this.updateValue = () =>{
        this.value.html(string+": "+this.slider.value());
    }
    /////////////////////Callbacks////////////////////////
    this.slider.input(this.updateValue);
}

function Button(index,string,start_width, start_height,callback){
    let padding =20;
    let button_height = 110;
    let button_width = 200;

    this.button = createButton(string);
    this.button.position(start_width,start_height+index*button_height+index*padding);
    this.button.size(button_width,button_height);
    this.button.mousePressed(callback);
}

function MainGui(system,controller){
    //this.title = createElement('h1', 'Curved Time Paths')
    //So Gui can talk with system
    this.system = system;
    //Used to update slider values display
    this.slider_list = [];
    //Used to turn display on/off
    this.button_list =[];
    this.GuiController = controller;
    this.show=true;
    /////////////////////Callbacks////////////////////////
    this.toggleTopMap = () => {
        g_toggle_top_map = (!g_toggle_top_map);
    }
    this.updateDisplay  = () => {
        let value_list = [];//low_payment,high_payment_slider,low_time,high_time
        for (let slider of this.slider_list){
            let value = slider.slider.value();
            value_list.push(value);
        }
        var ok = checkRanges(...value_list);
        if (ok){
            system.filterDisplay(...value_list);
        }
    }
    this.showPickupGui = () => {
        this.GuiController.gui_state = 2;
    }
    this.showDropoffGui = () => {
        this.GuiController.gui_state = 3;
    }
    /////////////////////INITALIZING SLIDERS////////////////////////
    let start_height = 60;
    let start_width = 60;
    let max_list = [g_payment_cutoff,g_payment_cutoff,g_time_cutoff,g_time_cutoff];
    let slider_names_list = ["Min Payment", "Max Payment", "Min Time", "Max Time"];
    for (let i=0; i<4; i++){
        let slider = new Slider(max_list[i],i,slider_names_list[i],start_width,start_height);
        this.slider_list.push(slider);
    }
    /////////////////////INITALIZING BUTTONS////////////////////////
    //Except Time/Payment button
    this.button_list.push(new Button(0,"Time/Payment",start_width,start_height,this.updateDisplay));

    let callback_list = [this.toggleTopMap, this.showPickupGui, this.showDropoffGui];
    let button_names_list=["Display Top Map", "Pickup", "Dropoff"];
    let button_start_width = windowWidth-210;
    for (let i=0; i<3; i++){
        let button = new Button(i,button_names_list[i],button_start_width,
                                start_height,callback_list[i]);
        this.button_list.push(button);
    }

}

////////////////////////////////////////////////////////////////////////////
MainGui.prototype.display = function() {
    if (this.show) {
       setHTMLelements(this,"?");
       this.system.plot();
       this.displayMaps();
    }
    else {
        setHTMLelements(this,"none");
    }
};
  ////////////////////
function setHTMLelements(gui,string){
    for (let element of gui.button_list){
        element.button.style("display",string);
    }
    for (let element of gui.slider_list){
        element.slider.style("display",string)
        element.value.style("display",string)
    }
}
  ////////////////////
MainGui.prototype.displayMaps = function() {
    texture(mapimg);
    plane(g_plane_resolution[0],g_plane_resolution[1]);
    if (g_toggle_top_map){
        push();
        translate(0,0,g_z_offset);
        plane(g_plane_resolution[0],g_plane_resolution[1]);
        pop();
    }
};
////////////////////////////////////////////////////////////////////////////

/////////////////////Helper Functions////////////////////////
function checkRanges(a,b,c,d){
    var first = (a<b);
    var second = (c<d);
    return first&&second
}
////////////////////////////////////////////////////////////////////////////

//function PickupGui(system){
    //this.
//}
