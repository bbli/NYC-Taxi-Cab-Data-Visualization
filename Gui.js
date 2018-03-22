function MainGui(system,controller){
    //this.title = createElement('h1', 'Curved Time Paths')
    //So Gui can talk with system
    this.system = system;
    //Used to update slider values display
    this.slider_list = [];
    //TECHNICALLY NOT NEEDED
    this.button_list =[];
    //Used to turn display on/off
    this.html_elements_list=[];
    this.GuiController = controller;
    this.show=true;
    this.toggle_top_map=true;
    /////////////////////Callbacks////////////////////////
    this.toggleTopMap = () => {
        this.toggle_top_map = (!this.toggle_top_map);
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
    let max_list = [g_payment_cutoff,g_payment_cutoff,g_time_cutoff,g_time_cutoff];
    let slider_names_list = ["Min Payment", "Max Payment", "Min Time", "Max Time"];
    for (let i=0; i<4; i++){
        let slider = new Slider(max_list[i],i,slider_names_list[i],this.GuiController.button_left_width,this.GuiController.button_start_height);
        this.slider_list.push(slider);
        this.html_elements_list.push(slider.slider);
        this.html_elements_list.push(slider.value);
    }
    /////////////////////INITALIZING BUTTONS////////////////////////
    //Except Time/Payment button
    //this.button_list.push(new Button(0,"Time/Payment",this.GuiController.button_left_width,this.GuiController.button_start_height,this.updateDisplay));
    let first_button = new Button(0,"Time/Payment",this.GuiController.button_left_width,
                                this.GuiController.button_start_height,this.updateDisplay);
    this.button_list.push(first_button);
    this.html_elements_list.push(first_button.button);

    let callback_list = [this.toggleTopMap, this.showPickupGui, this.showDropoffGui];
    let button_names_list=["Display Top Map", "Pickup", "Dropoff"];

    for (let i=0; i<3; i++){
        let button = new Button(i,button_names_list[i],this.GuiController.button_right_width,
                                this.GuiController.button_start_height,callback_list[i]);
        this.button_list.push(button);
        this.html_elements_list.push(button.button);
    }

    /////////////////////Methods////////////////////////
    this.display = function() {
                if (this.show) {
                   setHTMLelements(this,"?");
                   this.system.plot();
                   this.displayMaps();
                }
                else {
                    setHTMLelements(this,"none");
                }
    };
}


////////////////////
MainGui.prototype.displayMaps = function() {
    texture(mapimg);
    plane(g_plane_resolution[0],g_plane_resolution[1]);
    if (this.toggle_top_map){
        push();
        translate(0,0,g_z_offset);
        plane(g_plane_resolution[0],g_plane_resolution[1]);
        pop();
    }
};
////////////////////
function setHTMLelements(gui,string){
    for (let element of gui.html_elements_list){
        element.style("display",string);
    }
}
/////////////////////Helper Functions////////////////////////
function checkRanges(a,b,c,d){
    var first = (a<b);
    var second = (c<d);
    return first&&second
}
////////////////////////////////////////////////////////////////////////////

function PickupGui(system,controller){
    this.GuiController = controller;
    this.show=false;
    this.html_elements_list =[];
    this.button_list =[];
    /////////////////////Callbacks////////////////////////
    this.showMainGui = () => {
        this.GuiController.gui_state = 1;
    }

    /////////////////////Methods////////////////////////
    this.display = function() {
                if (this.show) {
                   setHTMLelements(this,"?");
                   this.displayMap();
                }
                else {
                    setHTMLelements(this,"none");
                }
    };
    /////////////////////INITALIZING BUTTONS////////////////////////
    
}

PickupGui.prototype.displayMap = function() {
    texture(mapimg);
    plane(g_plane_resolution[0],g_plane_resolution[1]);
};

