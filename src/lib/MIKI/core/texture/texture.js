import { ShinEventDispatcher } from 'shinevent';

class texture extends ShinEventDispatcher
{
    constructor(){
        super();
    }
    /**
     *
     *
     * @memberof texture
     */
    set texture(val){
        this._resource=val
        //console.log(val);
        this.width=val.width;
        this.height=val.height;
    }

    /**
     *
     *
     * @memberof texture
     */
    get texture(){
        return this._resource;

    }
    set width(val){
        this._w=val;
    }
    set height(val){
        this._h=val;
    }
    get width(){
        return this._w;
    }
    get height(){
        return this._h;
    }
    
}
export default texture