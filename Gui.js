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

function MainGui(system){
    //this.title = createElement('h1', 'Curved Time Paths')
    //So Gui can talk with system
    this.system = system;
    //Used to update slider values display
    this.slider_list = [];
    //Used to turn display on/off
    this.html_elements_list =[];
  ////////////////////////////////////////////////////////////////////////////
    this.pg = createGraphics(400,100);
    this.pg.background(255,0);
    this.pg.textSize(40);
    this.pg.text("Curved Taxi Paths",30,50);
    /////////////////////METHODS////////////////////////
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
    /////////////////////Callbacks////////////////////////
    /////////////////////INITALIZING SLIDERS////////////////////////
    let start_height = 60;
    let start_width = 60;
    let max_list = [g_payment_cutoff,g_payment_cutoff,g_time_cutoff,g_time_cutoff];
    let slider_names_list = ["Min Payment", "Max Payment", "Min Time", "Max Time"];
    for (let i=0; i<4; i++){
        let slider = new Slider(max_list[i],i,slider_names_list[i],start_width,start_height);
        this.slider_list.push(slider);
        this.html_elements_list.push(slider);
    }
    /////////////////////INITALIZING BUTTONS////////////////////////
    //Except Time/Payment button
    this.html_elements_list.push(new Button(0,"Time/Payment",start_width,start_height,this.updateDisplay));

    let callback_list = [this.toggleTopMap, this.toggleTopMap, this.toggleTopMap];
    let button_names_list=["Display Top Map", "Pickup", "Dropoff"];
    for (let i=0; i<3; i++){
        //NOT FINISHED
        let button = new Button(i,button_names_list[i],windowWidth-210,start_height,callback_list[i]);
        this.html_elements_list.push(button);
    }

}
MainGui.prototype.displayTitle = function() {
    easycam.beginHUD();    
    texture(this.pg);
    rect(windowWidth/2-200,0, 400,100);
    // textSize(40);
    // text("Curved Taxi Paths",windowWidth/2,windowHeight/2);
    easycam.endHUD();
};

/////////////////////Setup Functions////////////////////////
//

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
