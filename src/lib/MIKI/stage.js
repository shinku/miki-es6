import DisplayObjectContainer from './core/DisplayObjectConatiner';

class Stage extends DisplayObjectContainer{
    constructor(){
        super();
        this.ViewDistance=1000;
        this._className='stage'
    }
    static getInstance(){
        if(!Stage._instance){
            Stage._instance=new Stage();
        }
        return Stage._instance;
    }
    set path(val){
        this._path=val;
    }
    get path(){
        return this._path;
    }
    set context(val){
        this._context=val;
    }
    get context(){
        return this._context;
    }
    set rendertype(type){
        this._rendertype=type;
    }
    get rendertype(){
        return this._rendertype
    }
    set viewDistance(val)
    {
        this.ViewDistance=val;
    }
    get viewDistance()
    {
        return  this.ViewDistance;
    }
    get class(){
        return Stage
    }
}

export default Stage.getInstance();