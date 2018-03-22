function GuiController(){
    
    // 1=MainGui, 2=PickupGui, 3=DropoffGui
    this.gui_state = 1;

    this.button_start_height =60;
    this.button_left_width=60;
    this.button_right_width = windowWidth-210;

    /////////////////////Methods////////////////////////
    this.setDisplay = function() {
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
}
