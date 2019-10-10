
import stage from '../../stage'
import H5Resource from './H5Resource'
import MPresource from './MPResource'
import { ShinEvent, ShinEventDispatcher } from 'shinevent';
const RESOURCEPOOL={

}
const RESOURCE_GROUP={

}
class resource extends ShinEventDispatcher
{
    constructor(){
        
        super();
        
    }
    async load(){
        
    }
    static get resourcepool(){
        return resource._rpool;
    }
    static set resourcepool(val){
       
        resource._rpool=val;
        
    }
    say(){

    }
    pushResource(...params){
        console.log(params);
    }
    static getResourceByName(name){
        //console.log(resource);
        return RESOURCEPOOL[name];

    }
    static getResourceByGroupName(name)
    {
        return RESOURCE_GROUP[name];
    }
    static setResourceByName(name,resource)
    {
       
        let pool=RESOURCEPOOL;
        if(pool[name])
        {
            throw new Error(`this resource name:${name} has been named`);
            return;
        }
        pool[name]=resource;
    
    }
    static setResourceByGroupName(name,resource)
    {
        
        let pool=RESOURCE_GROUP;
        
        if(!pool[name])
        {
            pool[name]=[];
        }
        pool[name].push(resource);

    }
    static getH5Resource(){
        if(!resource.H5)
        {
            resource.H5=new H5Resource();
        }
        resource.H5.say();
        return resource.H5
    }
    static getMPResource(){
        if(!resource.MP)
        {

            resource.MP=new MPresource();

        }
        return resource.MP
    }
    static get RES(){
        
        switch(stage.path)
        {
            case "h5":
                return resource.getH5Resource();
            break;
            case "miniprogram":
                return resource.getMPResource();
            break;
        }
    }
}
export default resource