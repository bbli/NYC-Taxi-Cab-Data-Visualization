function Gui(){
    //this.title = createElement('h1', 'Curved Time Paths')
    this.pg = createGraphics(400,100);
    this.low_payment_slider = createSlider(0,g_payment_cutoff,0);
    this.high_payment_slider = createSlider(0,g_payment_cutoff,g_payment_cutoff);
    this.low_time_slider = createSlider(0,g_time_cutoff,0);
    this.high_time_slider = createSlider(0,g_time_cutoff,g_time_cutoff);
    console.log("high payment slider value: "+this.high_payment_slider.value());
    this.filter_button = createButton("Filter");
    this.top_map_button = createButton("Display Top Map");

    this.pg.background(255,0);
    this.pg.textSize(40);
    this.pg.text("Curved Taxi Paths",30,50);

    /////////////////////POSITION/SIZE OF SLIDERS////////////////////////
    let start_height = 100;
    let slider_seperation = 60;
    let slider_width = 200
    let slider_height = 50;
    let offset = 25;
    //this.title.position(windowWidth/2,50);
    this.top_map_button.position(windowWidth-slider_width,start_height);
    this.filter_button.position(50,start_height);
    this.low_payment_slider.position(50,start_height+offset+slider_height+slider_seperation);
    this.high_payment_slider.position(50,start_height+offset+slider_height+2*slider_seperation);
    this.low_time_slider.position(50,start_height+offset+slider_height+3*slider_seperation);
    this.high_time_slider.position(50,start_height+offset+slider_height+4*slider_seperation);

    this.low_payment_slider.size(slider_width,slider_height);
    this.high_payment_slider.size(slider_width,slider_height);
    this.low_time_slider.size(slider_width,slider_height);
    this.high_time_slider.size(slider_width,slider_height);
    this.filter_button.size(slider_width,125);
    this.top_map_button.size(slider_width,125);

    this.sliders = selectAll('input');
    setSliderClass(this.sliders);

    /////////////////////METHODS////////////////////////
    this.toggleTopMap = () => {
        g_toggle_top_map = (!g_toggle_top_map);
    }
    this.updateDisplay  = () => {
        let low_payment = this.low_payment_slider.value();
        let high_payment = this.high_payment_slider.value();
        let low_time = this.low_time_slider.value();
        let high_time = this.high_time_slider.value();

        var ok = checkRanges(low_payment,high_payment,low_time, high_time);
        if (ok){
            g_system.filterDisplay(low_payment,high_payment,low_time,high_time);
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
function setSliderClass(sliders){
    for (let slider of sliders){
        slider.addClass('slider');
    }
}
////////////////////////////////////////////////////////////////////////////

/////////////////////Helper Functions////////////////////////
function checkRanges(a,b,c,d){
    var first = (a<b);
    var second = (c<d);
    return first&&second
}
////////////////////////////////////////////////////////////////////////////
