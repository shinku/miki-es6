import {mikiWebglBase} from '../webgl/mikiWebglBase';
import DisplayObjectConatiner from '../DisplayObjectConatiner';
import { userHands } from "../utils/userHands";
import { userDetective } from "../geo/userDetective";

class contextgetWebgl {

    constructor(base){
        
        this.base=base;
        this.context=base.context;
        
    }
    init(){
        this.touchedtarget=null;
    }

    static getContext(canvas){
        
        let base=new mikiWebglBase(canvas);
        return new contextgetWebgl(base);
    }
    fresh(){
        this.base.fresh();
        this.init();
        //context.clearRect(0,0,750,1000);
    }
    renderInner(displayobject,ismasker=false){
        let GM=DisplayObjectConatiner.globalMatrix(displayobject);
        displayobject.istouched=false;
        //
       
        if(displayobject.ismasker )
        {
            //this.base.drawElement(displayobject,GM,ismasker);
           if(ismasker)  this.base.drawElement(displayobject,GM);
        }
        else {
            //如果又遮罩
            //先绘制遮罩对象到缓存中
            if(displayobject.mask)
            {
                //let {context} = this;
                //开启模板检测
                this.base.enableStencil();
                this.base.maskerStart()
                this.renderInner(displayobject.mask,true);
                //displayobject.mask.alpha=0.4;
                this.base.maskerEnd();
                this.base.drawElement(displayobject,GM);
                //关闭模板检测
                this.base.disableStencil();
            }
            else{
                this.base.drawElement(displayobject,GM);
            }
            
           
        }
        
        //检测是否被点击之间撞到
        if(userHands.getInstance().touchStep!=0 && displayobject.ismasker==false)
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
            //if(ismasker) console.log(element);
            this.renderInner(element,ismasker);
        });
    }
     render(displayobject,...params)
    {
        
        let GM=DisplayObjectConatiner.globalMatrix(displayobject);
        //执行绘制
        displayobject.istouched=false;
        this.base.drawElement(displayobject,GM);
        //检测是否被点击之间撞到
        if(userHands.getInstance().touchStep!=0)
        {
            
            let {
                touchx,
                touchy
            } = userHands.getInstance();
            
            let isHit=userDetective.isHitTest({x:touchx,y:touchy},GM);
            if(isHit===true) {
                displayobject.istouched=true;
            }
        }
    }

}
export {contextgetWebgl}