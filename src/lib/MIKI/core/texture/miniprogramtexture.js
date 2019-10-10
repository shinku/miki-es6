import texture from './texture'

class miniprogramtexture extends texture
{
    constructor(){
        super();
        
    }
     /**
     *
     *
     * @memberof texture
     */
    get imageresource(){
        return this._resource;
    }

    /**
     *
     *
     * @memberof texture
     */
    set imageresource(_resource){
        this._resource=_resource;
    }
  
}
export default miniprogramtexture