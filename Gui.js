function Slider(max,index,string,start_height){
    let slider_width = 200
    let slider_seperation = 60;
    let slider_height = 50;
    let offset = 15;

    this.slider = createSlider(0,max,0);
    //This is just for setup. Will replace html element 
    //for every change
    this.value = createP(string+": "+this.slider.value());

    this.slider.position(50,start_height+offset+slider_height+(index+1)*slider_seperation)
    this.value.position(slider_width+20+50,start_height+offset+slider_height+(index+1)*slider_seperation);
    
    this.slider.size(slider_width,slider_height);
    this.slider.addClass('slider');

    /////////////////////Methods////////////////////////
    this.updateValue = () =>{
        this.value.html(string+": "+this.slider.value());
    }

    /////////////////////Callbacks////////////////////////
    this.slider.input(this.updateValue);
}


function MainGui(system){
    //Used to turn display on/off
    this.html_elements_list =[];
    
    this.max_list = [g_payment_cutoff,g_payment_cutoff,g_time_cutoff,g_time_cutoff];
    this.slider_names_list = ["Min Payment", "Max Payment", "Min Time", "Max Time"];
    this.slider_list = [];
  ////////////////////////////////////////////////////////////////////////////
    let start_height = 60;
    for (let i=0; i<4; i++){
        var slider = new Slider(this.max_list[i],i,this.slider_names_list[i],start_height);
        this.slider_list.push(slider);
        this.html_elements_list.push(slider);
    }

    this.system = system;
    //this.title = createElement('h1', 'Curved Time Paths')
    this.filter_button = createButton("Time/Payment");
    this.html_elements_list.push(this.filter_button);
    this.top_map_button = createButton("Display Top Map");
    this.html_elements_list.push(this.top_map_button);
    this.pickup_button = createButton("Pickup");
    this.html_elements_list.push(this.pickup_button);
    this.dropoff_button = createButton("Dropoff");
    this.html_elements_list.push(this.dropoff_button);
    

    this.pg = createGraphics(400,100);
    this.pg.background(255,0);
    this.pg.textSize(40);
    this.pg.text("Curved Taxi Paths",30,50);

    /////////////////////POSITIONS////////////////////////
    //this.title.position(windowWidth/2,50);
    let button_width = 200
    let button_height = 110;
    let padding =20;
    this.top_map_button.position(windowWidth-button_width,start_height);
    this.filter_button.position(50,start_height);
    this.pickup_button.position(windowWidth-button_width,start_height+button_height+padding);
    this.dropoff_button.position(windowWidth-button_width,start_height+2*button_height+2*padding);

    /////////////////////SIZES////////////////////////
    this.filter_button.size(button_width,button_height);
    this.top_map_button.size(button_width,button_height);
    this.pickup_button.size(button_width,button_height);
    this.dropoff_button.size(button_width,button_height);


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
    this.top_map_button.mousePressed(this.toggleTopMap);
    this.filter_button.mousePressed(this.updateDisplay);

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
