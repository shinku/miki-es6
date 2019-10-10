import DisplayObjectContainer from './DisplayObjectConatiner'
import { ShinTimeEvent } from 'shintimeline'
import {ShinEvent} from 'shinevent'

class DisplayObject extends DisplayObjectContainer
{
    constructor(){

        super();
        this._texture=null;
        this._className='displayobject';
        this.isnewtexture=false;
    }
    
    //_texture:texture
    set texture(_texture){
        
        //console.log(this,'change');
        this._texture=_texture;
        this.width=_texture.width;
        this.height=_texture.height;
        this.isnewtexture=true;
        this.dispatchEvent(new ShinEvent('updatetexture'));
       
    }
    set textureBuffer(val){
        this._textBuffer=val;
    }
    get textureBuffer(){
        return this._textBuffer;
    }
    get texture(){
       
        return this._texture;
    }
   
    
}
export default DisplayObject;