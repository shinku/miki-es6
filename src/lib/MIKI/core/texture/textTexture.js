import texture from './texture'
import {canvasBuffer} from '../utils/canvasBuffer'
import { ShinEvent } from 'shinevent';
/**
 * 文本贴图
 */
class textTexTure extends texture{
    constructor(option){
        super();
        this.textureOption=option;
        this.textbuffer=new canvasBuffer();
        this.img=new Image();
      
        this.imgloaded=false;
        this.img.onload=()=>{
            
            this.imgloaded=true;
            this.dispatchEvent(new ShinEvent('textloaded'));
        }   

    }
    set option(val)
    {
        
        this.textureOption=val;
        
        if(this._text) this.textbuffer.drawText(this._text,this.textureOption);
        this.imgloaded=false;
        
        this.img.src=canvasBuffer.urlData(this.textbuffer.canvas,'image/png');
        
    }
    set text(val){
        
        if(val==this._text) return;
        this._text=val;
        
        this.textbuffer.drawText(val,this.textureOption);
        this.img.src=canvasBuffer.urlData(this.textbuffer.canvas,'image/png');
        
    }
    get texture(){
        
        if(this.imgloaded){
            
            return this.img;
        }
        else return null;
    }

}
export {textTexTure}