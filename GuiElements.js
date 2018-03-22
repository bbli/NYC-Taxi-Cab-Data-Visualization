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

