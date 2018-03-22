function MainGui(system,controller){
    this.title = "Curved Taxi Paths";
    this.pg = createGraphics(400,100);
    this.pg.background(255,10);
    this.pg.textSize(40);
    this.pg.text(this.title,30,50);
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
    //Needed for system to update filter
    this.values_list = [];
    /////////////////////Callbacks////////////////////////
    this.toggleTopMap = () => {
        this.toggle_top_map = (!this.toggle_top_map);
    }
    this.updateDisplay  = () => {
        system.filterDisplay();
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
                   setHTMLelements(this,"");
                   this.system.plot();
                   this.displayMaps();
                   this.displayTitle();
                }
                else {
                    setHTMLelements(this,"none");
                }
    };
    this.values_list = function(){
        let list = [];//low_payment,high_payment_slider,low_time,high_time
        for (let slider of this.slider_list){
            let value = slider.slider.value();
            list.push(value);
        }
        return list
    }
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
MainGui.prototype.displayTitle = function() {
        g_easycam.beginHUD();    
        texture(this.pg);
        rect(windowWidth/2-200,0, 400,100);
        // textSize(40);
        // text("Curved Taxi Paths",windowWidth/2,windowHeight/2);
        g_easycam.endHUD();
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

function PickupGui(system,controller,title){
    this.pg = createGraphics(400,100);
    this.pg.background(255,10);
    this.pg.textSize(40);
    this.pg.text(title,90,50);

    this.system = system;
    this.GuiController = controller;
    this.show=false;
    this.html_elements_list =[];
    this.button_list =[];
    this.radius = 1200;
    this.x = windowWidth/2;
    this.y = windowHeight/2;

    this.title = "Pickup"
    /////////////////////Callbacks////////////////////////
    //Needs to be initalzed before buttons
    this.updateDisplay = () => {
        g_easycam.setState(g_state);
        this.system.filterDisplay();
        setTimeout(() => this.GuiController.gui_state = 1 , 300);
    }

    this.resetState = () => {
        this.x = windowWidth/2;
        this.y = windowHeight/2;
        this.radius = 1200;
    }
    /////////////////////INITALIZING BUTTONS////////////////////////
    this.reset_button = new Button(0,"Reset Filter",this.GuiController.button_left_width,
    this.GuiController.button_start_height,this.resetState);
    this.html_elements_list.push(this.reset_button.button);
    this.apply_button = new Button(0,"Apply Filter",this.GuiController.button_right_width,
    this.GuiController.button_start_height,this.updateDisplay);
    this.html_elements_list.push(this.apply_button.button);
    /////////////////////Methods////////////////////////
    this.display = function() {
                if (this.show) {
                   setHTMLelements(this,"");
                   this.displayMap();
                   this.displayTitle();
                }
                else {
                    setHTMLelements(this,"none");
                }
    };
    this.location = function(){
        let x= this.x - windowWidth/2;
        let y = this.y - windowHeight/2;
        return [x,y]
    } 
}

PickupGui.prototype.displayMap = function() {
    g_easycam.beginHUD();
    push();
    texture(mapimg);
    translate(windowWidth/2,windowHeight/2);
    plane(g_plane_resolution[0],g_plane_resolution[1]);
    pop();
    push();
    fill(255,255,0,160);
    ellipse(this.x,this.y,this.radius,this.radius);
    pop();
    g_easycam.endHUD();
};

PickupGui.prototype.displayTitle = function() {
        g_easycam.beginHUD();    
        texture(this.pg);
        rect(windowWidth/2-200,0, 400,100);
        // textSize(40);
        // text("Curved Taxi Paths",windowWidth/2,windowHeight/2);
        g_easycam.endHUD();
};


function mouseWheel(event){
    if (g_pickupgui.show){
        g_pickupgui.radius += increment(event);
    }
    else if (g_dropoffgui.show){
        g_dropoffgui.radius += increment(event);
    }
}

function increment(event){
    if (event.deltaY>0){
        return 32;
    }
    else {
        return -32;
    }
}

function mouseDragged(event){
    if (g_pickupgui.show){
        g_pickupgui.x = mouseX;
        g_pickupgui.y = mouseY;
    }
    else if (g_dropoffgui.show){
        g_dropoffgui.x = mouseX;
        g_dropoffgui.y = mouseY;
    }
}

function DropoffGui(gui){
   //figure out tomorrow 
}
