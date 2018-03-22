function GuiController(){
    this.pg = createGraphics(400,100);
    this.pg.background(255,10);
    this.pg.textSize(40);
    this.pg.text("Curved Taxi Paths",30,50);
    
    // 1=MainGui, 2=PickupGui, 3=DropoffGui
    this.gui_state = 1;

    this.button_start_height =60;
    this.button_left_width=60;
    this.button_right_width = windowWidth-210;

}

GuiController.prototype.displayTitle = function() {
    g_easycam.beginHUD();    
    texture(this.pg);
    rect(windowWidth/2-200,0, 400,100);
    // textSize(40);
    // text("Curved Taxi Paths",windowWidth/2,windowHeight/2);
    g_easycam.endHUD();
};

GuiController.prototype.setDisplay = function() {
    if (this.gui_state==1){
            g_maingui.show=true;
            g_pickupgui.show=false;
            g_dropoffgui.show=false;
    }
    else if (this.gui_state==2){
            g_maingui.show=false;
            g_pickupgui.show=true;
            g_dropoffgui.show=false;
    }
    else if (this.gui_state==3){
            g_maingui.show=false;
            g_pickupgui.show=false;
            g_dropoffgui.show=true;
    }
};

