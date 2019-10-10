
import textField from "../../dispay/textfield";
import DisplayObjectConatiner from '../DisplayObjectConatiner'
import {textfieldRender} from '../2d/textfieldrender'
import { userHands } from "../utils/userHands";
import { userDetective } from "../geo/userDetective";
class contextget2d {

    constructor(context){
        this.context=context;
    }
    static getContext(canvas){

        let context=canvas.getContext('2d');
        return new contextget2d(context);
        
    }
    init(){
        this.touchedtarget=null;
    };
    fresh(){
      
        this.init();
        this.context.clearRect(0,0,750,1000);
    }
    update(){
        
    }
    renderInner(displayobject,...params){
        
        displayobject.istouched=false;
        this.render(displayobject);
        //检测是否被点击之间撞到
        if(userHands.getInstance().touchStep!=0)
        {
            let {
                touchx,
                touchy
            } = userHands.getInstance();
            
            let isHit=userDetective.isHitTest({x:touchx,y:touchy},GM);
            if(isHit===true) {
                this.touchedtarget=displayobject;
            }
        }
        let {children} = displayobject;
        children.forEach(element => {
            this.renderInner(element);
        });
    }
    render(displayobject,...params)
    {
       
        if(!displayobject.texture) return;
        //console.log(displayobject.texture);
        let texture=displayobject.texture.texture;
        if(!texture) return;
        let GM=DisplayObjectConatiner.globalMatrix(displayobject);
        let context=this.context;
        context.save();
        let ox=displayobject.originPositionX;
        let oy=displayobject.originPositionY;
        context.globalAlpha=GM.alpha;
        context.translate(GM.x+GM.width*ox,GM.y+GM.height*oy);
        context.rotate(GM.rotation);
        context.scale(GM.scaleX,GM.scaleY);
        context.translate(-GM.x-GM.width*ox,-GM.y-GM.height*oy);
        context.translate(GM.x,GM.y);
        context.drawImage(texture,
                0,
                0,
                GM.width,
                GM.height,
                0,
                0,
                GM.width,
                GM.height);
    
        context.restore();
      
        if(userHands.getInstance().touchStep==1)
        {
            let {
                touchx,
                touchy
            } = userHands.getInstance();
            let isHit=userDetective.isHitTest({touchx,touchy},GM);
            //console.log(isHit)
            //console.log(touchx,touchy);
        }

    }

}
export {contextget2d}