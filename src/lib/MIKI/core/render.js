import stage from '../stage'
import displaytree from './displayTree'
import { userHands } from './utils/userHands';
import { mikiEvent } from './mikievents/mikiEvent';
class render{
    
    static render(){
       
        let contextget=stage.context;
        let displays=displaytree.buildTree();
        contextget.fresh();
        let touchedtarget=null;
        contextget.renderInner(stage);
        touchedtarget=contextget.touchedtarget;
       
        /*for(var i=0;i<displays.length;i++)
        {
            console.log();
            contextget.render(displays[i]);
            //如果被碰到
            if(displays[i].istouched)
            {
                touchedtarget=displays[i];
            }

        }*/

        //console.log(touchedtarget);
        if(touchedtarget){
         
           
            switch(userHands.getInstance().touchStep)
            {
                case 1:
                    touchedtarget.handleTouchEvent(new mikiEvent('touchstart'));
                    break;
                case 2:
                    touchedtarget.handleTouchEvent(new mikiEvent('touchmove'));
                    break;

                case 3:
                    touchedtarget.handleTouchEvent(new mikiEvent('touchend'));
                    break;

            }
           
        }
        userHands.getInstance().updateState(); 
        touchedtarget=null;
        
        
      
    }
}
export default render;