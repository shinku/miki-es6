import {textfieldRenderCell} from './textfieldRenderCell'
import DisplayObjectContainer from '../DisplayObjectConatiner'
class textfieldRender {
    static render(context,textfield,options)
    {
        
        let {

            width,
            height,
            x,
            y,
            autoWrap,
            text,
            fontSize

        }=textfield;
        let offsetwidth=0;
        let offsetheight=0;
        let offsetnum=0;
        let spacebetween=1;
        let linebetween=1;
        for(var i=0;i<text.length;i++)
        {
            context.save();
            let word=text.charAt(i);
            //console.log(word);
            let word_w=context.measureText(word).width;
           
            let word_h=parseInt(fontSize);
            let _x=offsetwidth;
            //console.log
            if(_x+word_h>width) {
                offsetnum=0;
                offsetwidth=0;
                _x=0;
                offsetheight+=parseInt(textfield.fontSize)+linebetween;
            }
            let _y=offsetheight;
            offsetwidth+=word_h+spacebetween;
            //console.log(word,word_w,_x);

            let cell=new textfieldRenderCell(word,
                _x,
                _y,
                word_w,
                word_h,
                1,
                0,
                1,
                1,
                textfield
                )
            offsetnum++;
            let GM=DisplayObjectContainer.globalMatrix(cell);
            context.fillStyle=textfield.textColor;
            context.translate(GM.x,GM.y);
            context.rotate(-GM.rotation);
            context.scale(GM.scaleX,GM.scaleY);
            context.translate(-GM.x,-GM.y);
            context.translate(GM.x,GM.y);
            context.font=textfield.fontSize+"px "+textfield.fontFamily;
            //console.log(GM);
            context.fillText(word,0,0);
            context.restore();
        }

    }
}
export {textfieldRender}