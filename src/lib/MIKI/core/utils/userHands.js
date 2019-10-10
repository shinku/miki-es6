import {ShinEventDispatcher, ShinEvent } from "shinevent";
import { mikiEvent } from "../mikievents/mikiEvent";
import { ShinTimeLine } from "shintimeline";

//手势
class userHands extends ShinEventDispatcher
{   
    constructor(){
        super();
        this.touchx=0;
        this.touchy=0;
        this.offsetx=0;
        this.offsety=0;
        this.touchStep=0;
     
    }
    static getInstance(){
        if(!userHands._instance)
        {
            userHands._instance=new userHands();   
        }
        return userHands._instance;
    }
   
    handleTouchStart(e){
       if(e.targetTouches){
        this.touchx=e.targetTouches[0].offsetX;
        this.touchy=e.targetTouches[0].offsetY;
       }
       else{
           this.touchx=e.offsetX;
           this.touchy=e.offsetY;
       }
        //向外发布touch事件
        //touchStep=1;
        this.touchStep=1;
    }
    updateState(){
      
        if(this.touchStep==1 || this.touchStep==3) this.touchStep=0;
        
    }
    handleTouchMove(e){
        if(e.targetTouches){
            this.touchx=e.targetTouches[0].offsetX;
            this.touchy=e.targetTouches[0].offsetY;
           }
           else{
               this.touchx=e.offsetX;
               this.touchy=e.offsetY;
           }
        this.touchStep=2;
    }
    handleTouchEnd(e){
        
        this.touchStep=3;
        //this.isTouch=this.isMove
    }
    
}
//
export {userHands}