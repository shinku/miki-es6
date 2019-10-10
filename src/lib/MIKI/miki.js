
import {contextget2d,contextgetWebgl} from './core/contextget'
import stage from './stage';
import {ShinTimeLine,ShinTimeEvent} from 'shintimeline'
import render from './core/render'
//用户手势类
import {userHands} from './core/utils/userHands'
import { ShinEventDispatcher, ShinEvent } from 'shinevent';


class miki extends ShinEventDispatcher
{
    constructor()
    {
        super();

    }
    /**
     *
     *
     * @static
     * @param {canvas对象} canvas
     * @param {渲染类型:2d/webgl，默认2d} rendertype
     * @param {平台：h5/miniprogram;默认h5} path
     * @memberof miki
     */
    static init(canvas,rendertype,path){
        
        rendertype='webgl';
        switch(rendertype.toLowerCase())
        {
            case 'webgl':stage.context=contextgetWebgl.getContext(canvas);break;
            case "2d":stage.context=contextget2d.getContext(canvas);break;
            default : stage.context=contextget2d.getContext(canvas);break;
        }
        //let uh=new userHands();
        //canvas.addEventListener('touchstart',)
        canvas.addEventListener('click',e=>userHands.getInstance().handleTouchStart(e));
        canvas.addEventListener('mousemove',e=>userHands.getInstance().handleTouchMove(e));
        canvas.addEventListener('touchend',e=>userHands.getInstance().handleTouchEnd(e));
        stage.path=path || 'h5';
        
    }
    static render(){
        
        if(!miki.start)
        {
            miki.start=true;
            ShinTimeLine.addEventListener(ShinTimeEvent.FRAME,miki.handleFrame,miki);
            ShinTimeLine.frameRate=24;
        }
    }
    static handleFrame(e)
    {
        render.render();
    }
    
}
export default miki;

