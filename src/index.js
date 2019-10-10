console.log("Hello World from your main file!");
import {

    miki,
    stage,
    resource,
    h5texture,
    texture,
    minkpoint,
    DisplayObject,
    DisplayObjectContainer,
    sprite,
    frameSprite,
    textField

}
 from "./lib/MIKI/";
import { ShinTimeLine, ShinTimeEvent } from "shintimeline";
miki.init(document.getElementById('mycanvas'),'webgl');
window.onAnimationFrame=(e)=>{
    miki.render();
    
}
ShinTimeLine.addEventListener(ShinTimeEvent.FRAME,window.onAnimationFrame,window);
let txt=new textField();
txt.text="hello";
let text2= new textField();
text2.text='shin';
text2.y=50;
stage.addChild(txt);
stage.addChild(text2);
