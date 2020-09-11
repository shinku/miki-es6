
import resource from './resource'

import textureloader from './textureloader';
import { ShinEvent,ShinEventDispatcher } from 'shinevent';
class H5resource extends ShinEventDispatcher
{
    constructor(){
        
        super();
        this.textures=[];
        this.percent=0;
        
    }

    async load(){
        for(var i=0;i<this.textures.length;i++)
        {
            await this.textures[i].load();
            this.percent=i/this.textures.length;
            let e=new ShinEvent('loading');
            e.data=this.percent;
            this.dispatchEvent(e);
        }
        this.dispatchEvent(new ShinEvent('loaded',this.percent));
        
    }
    pushResource(src,resourcename,groupname){

        let h5texture=new textureloader(src);
        this.textures.push(h5texture);
        if(resourcename)
        {
            resource.setResourceByName(resourcename,h5texture)
        }
        if(groupname)
        {
            resource.setResourceByGroupName(groupname,h5texture);
        }
        
    }
  
}
export default H5resource
