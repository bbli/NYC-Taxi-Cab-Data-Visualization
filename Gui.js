function Gui(){
    //this.title = createElement('h1', 'Curved Time Paths')
    this.pg = createGraphics(400,100);
    this.low_payment_slider = createSlider(0,g_payment_cutoff,0);
    this.high_payment_slider = createSlider(0,g_payment_cutoff,g_payment_cutoff);
    this.low_time_slider = createSlider(0,g_time_cutoff,0);
    this.high_time_slider = createSlider(0,g_time_cutoff,g_time_cutoff);
    this.update_button = createButton("Filter");
    this.top_map_button = createButton("Display Top Map");

    this.pg.background(255,0);
    this.pg.textSize(40);
    this.pg.text("Curved Taxi Paths",30,50);

    let start_height = 100;
    let slider_seperation = 60;
    let slider_width = 200
    let slider_height = 50;
    let offset = 25;
    //this.title.position(windowWidth/2,50);
    this.top_map_button.position(windowWidth-slider_width,start_height);
    this.update_button.position(50,start_height);
    this.low_payment_slider.position(50,start_height+offset+slider_height+slider_seperation);
    this.high_payment_slider.position(50,start_height+offset+slider_height+2*slider_seperation);
    this.low_time_slider.position(50,start_height+offset+slider_height+3*slider_seperation);
    this.high_time_slider.position(50,start_height+offset+slider_height+4*slider_seperation);

    this.low_payment_slider.size(slider_width,slider_height);
    this.high_payment_slider.size(slider_width,slider_height);
    this.low_time_slider.size(slider_width,slider_height);
    this.high_time_slider.size(slider_width,slider_height);
    this.update_button.size(slider_width,125);
    this.top_map_button.size(slider_width,125);

    //let bg_color = color(222,100,167);
    //this.update_button.style('background-color', bg_color);
    //this.low_payment_slider.style('background', bg_color);
    //this.high_payment_slider.style('background', bg_color);
    //this.low_time_slider.style('background', bg_color);
    //this.high_time_slider.style('background', bg_color);

    //this.low_payment_slider.style('border-radius',5);
    //this.high_payment_slider.style('border-radius',5);
    //this.low_time_slider.style('border-radius',5);
    //this.high_time_slider.style('border-radius',5);
}

Gui.prototype.displayTitle = function() {
    easycam.beginHUD();    
    texture(this.pg);
    rect(windowWidth/2-200,0, 400,100);
    // textSize(40);
    // text("Curved Taxi Paths",windowWidth/2,windowHeight/2);
    easycam.endHUD();
};

