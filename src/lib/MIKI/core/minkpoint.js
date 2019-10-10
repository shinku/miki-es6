class mikipoint{
    
    constructor(x,y){
        
        this._x=x;
        this._y=y;
        
    }
    set x(val){
        this._x=0;
    }
    set y(val){
        this._y=0;
    }
    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
}
export default mikipoint;