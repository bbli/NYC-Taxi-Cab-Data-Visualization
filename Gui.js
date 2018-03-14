function Slider(max,index,string){
    let start_height = 100;
    let slider_width = 200
    let slider_seperation = 60;
    let slider_height = 50;
    let offset = 25;

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


function Gui(system){

    this.max_list = [g_payment_cutoff,g_payment_cutoff,g_time_cutoff,g_time_cutoff];
    this.slider_names_list = ["Payment Min", "Payment Max", "Time Min", "Time Max"];
    this.slider_list = [];
  ////////////////////////////////////////////////////////////////////////////
    for (let i=0; i<4; i++){
        var slider = new Slider(this.max_list[i],i,this.slider_names_list[i]);
        this.slider_list.push(slider);
    }

    this.system = system;
    //this.title = createElement('h1', 'Curved Time Paths')
    this.filter_button = createButton("Filter");
    this.top_map_button = createButton("Display Top Map");
    

    this.pg = createGraphics(400,100);
    this.pg.background(255,0);
    this.pg.textSize(40);
    this.pg.text("Curved Taxi Paths",30,50);

    /////////////////////POSITIONS////////////////////////
    //this.title.position(windowWidth/2,50);
    let start_height = 100;
    let slider_width = 200
    this.top_map_button.position(windowWidth-slider_width,start_height);
    this.filter_button.position(50,start_height);

    /////////////////////SIZES////////////////////////
    this.filter_button.size(slider_width,125);
    this.top_map_button.size(slider_width,125);


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
Gui.prototype.displayTitle = function() {
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
