import IDraw from './I.Draw'
//import Stage from '../stage'
import {ShinTimeLine,ShinTimeEvent} from 'shintimeline'
import { ShinEvent } from 'shinevent';
import { graphics } from '../dispay/graphics';

class DisplayObjectContainer extends IDraw
{
    
    constructor(){
        super();
        
        this.children=[];
        this.childPool=new Map();
        this._childIndex=0;
        this._width=0;
        this._height=0;
        this._x=0;
        this._y=0;
        this._z=0;
        this._scale=1;
        this._scaleX=1;
        this._scaleY=1;
        this._rotation=0;
        this.parent=null;
        this._alpha=1;
        this._visible=true;; 
        this._touchable=false;
        ShinTimeLine.addEventListener(ShinTimeEvent.FRAME,this._handleFrame,this);
        ShinTimeLine.addEventListener(ShinTimeEvent.SECOND,this._handleSecond,this);
        this.addEventListener('addedtostage',this._handleAdded,this);
        this._className='displayobjectcontainer';
        this.originPositionX=0;
        this.originPositionY=0;
        
        this.ismasker=false;
        this._graphics=new graphics();
        
    }
    get graphics(){
        return this._graphics;
    }
    get childNumber(){
        return this.children.length;
    }

    set ismasker(val){
        this._ismasker=val;
        this.children.forEach(child=>child.ismasker=val);
    }   
    get ismasker(){
        return this._ismasker;
    }
    set mask(_mask){
        if(this._mask)
        {
            if(this._mask) this._mask.ismasker=false;
            //return;
        }
        this._mask=_mask;
        if(this._mask==null) return;
        this._mask.ismasker=true;
    }
    get mask(){
        return this._mask;
    }
    handleTouchEvent(e)
    {
        //响应用户点击事件
        e.currentTarget=this;
        this.dispatchEvent(e);
        if(this.parent)
        {
            this.parent.handleTouchEvent(e);
        }

    }
    _handleFrame(e){
        
        this.dispatchEvent(new ShinEvent('frame'));
    }
    _handleSecond(e){
        this.dispatchEvent(new ShinEvent('second'));
    }
    _handleAdded(e)
    {

    }
    set touchable(val){
        this._touchable=val;
    }
    get touchable(){
        return this._touchable;
    }
    set alpha(val)
    {
        this._alpha=val;
    }
    get alpha(){
        return this._alpha;
    }
    set parent(val){

        this._parent=val;
        
    }
    set visible(val){

        this._visible=val;
    }   
    get visible()
    {
        return this._visible || false;
    }
    get parent(){


        return this._parent;

    }
    set scaleX(val){
        this._scaleX=val;
    }
    set scaleY(val){
        this._scaleY=val;
    }
    get scaleX(){
        return this._scaleX;
    }
    get scaleY(){
        return this._scaleY;
    }
    set width(val){
        this._width=val;
    }
    set height(val)
    {
        this._height=val;
    }
    get width(){
        let maxw=this._width;
        //console.log(maxw);
        this.children.forEach(item=>maxw=Math.max(item.x+item.width,maxw));
        return maxw;
    }
    get height(){
        let maxh=this._height;
        this.children.forEach(item=>maxh=Math.max(item.y+item.height,maxh));
        return maxh;
    }
    set x(val){
        this._x=val;
    }
    get x(){
        return this._x;
    }
    set y(val){
        this._y=val;
    }
    get y(){
        return this._y;
    }
    set z(val){
        this._z=val;
    }
    get z(){
        return this._z;
    }
    /*
    get screenx(){
        if(this.stage)
        {
            return this.x*(this.stage.viewDistance/this.stage.viewDistance+this.z);
        }
    }
    get screeny(){
        if(this.stage)
        {
            return this.y*(this.stage.viewDistance/this.stage.viewDistance+this.z);
        }
    }*/
    set rotation(val){
        this._rotation=val;
    }
    get rotation(){
        return this._rotation;
    }
    set scale(val){
        this._scale=val;
    }
    get scale(){
        return this._scale;
    }
    addChild(child){
        let cdepth=this.getChildDepth();
        if(cdepth>=0)
        {
            this.switch(child,cdepth);
        }
        //child._childIndex=this.children.length;
        this.children.push(child);
        child.parent=this;
        this.refreshIndex();
        let parent=this.parent;
        let lastparent=this;
        while(parent)
        {
            lastparent=parent;
            parent=parent.parent;
        }
        
        
        if(lastparent.classname =='stage')
        {
            //说明已经添加至舞台
            //console.log("YUYUIYUIYUI");
            child.dispatchAdded();
        }
        return this;
    }
    switch(child,cdepth){
        let index=child.childindex;
        this.children.splice(index,1);
        this.children.push(child);
    }
    changeIndex(childa,childb)
    {

        let index1=childa.childindex;
        let index2=childb.childindex;
        //替换索引位置
        childa.childindex=index2;
        childb.childindex=index1;
        //更换两者在数组中的位置
        this.children[index1]=childb;
        this.children[index2]=childa;

    }
    refreshIndex(){

        for(var i=0;i<this.children.length;i++)
        {
            if(this.children[i].childindex=i);
            
        }
    }
    hasChild(child){
        for(var i=0;i<this.children.length;i++)
        {
            if(this.children[i]==child)
            {
                return true;
            }
        }
        return false;
    }
    getChildDepth(child){
        for(var i=0;i<this.children.length;i++)
        {
            if(this.children[i]==child)
            {
                return i;
            }
        }
        return -1;
    }
    //删除元素
    removeChild(child){
        for(var i=0;i<this.children.length;i++)
        {
            if(this.children[i]==child)
            {
                this.children[i].parent=null;
                //移除的时候发布移除事件
                this.children[i].dispatchEvent(new ShinEvent('removefromstage'));
                this.children.splice(i,1);
            }
        }
        return this;
    }
    //根据位置删除元素
    removeChildAt(index){
        let child=this.children[index];
        this.removeChild(child);
    }
    //删除所有元素
    removeAllChild()
    {
        while(this.childNumber>0)
        {
            this.removeChildAt(0);
        }
    }
    set childindex(val){
        this._childIndex=val;
    }
    get childindex(){
        return this._childIndex;
    }
    set stage(_stage){
        this._stage=_stage;
    }
    get stage(){
        return this._stage;
    }
    localToGlobal(point){
        let _parent=this.parent;
        while(_parent)
        {
            point.x+=(_parent.x);
            point.y+=(_parent.y);
            _parent=_parent.parent
        }
        return point;
    }
    beforeRender(){
        this.dispatchEvent(new ShinEvent('beforerender'));
    }
    globalToLocal(point){
       return point;
    }
    dispatchAdded(){
        this.dispatchEvent(new ShinEvent('addedtostage'));
        this.children.forEach(child=>child.dispatchAdded())
    }
    set originPositionX(val){
        this._originPositionX=val;
    }
    set originPositionY(val){
        this._originPositionY=val;
    }
    get originPositionX(){
        return this._originPositionX
    }
    get originPositionY(){
        return this._originPositionY
    }
    rect(){
       
    }
    static globalMatrix(target){
        
        let _parent=target.parent;
        let pos={
            x:target.x,
            y:target.y,
            scale:target.scale,
            rotation:target.rotation,
            alpha:target.alpha,
            width:target._width,
            height:target._height,
            scaleX:target.scaleX,
            scaleY:target.scaleY,

        }
        /**
         *  x1=xcos(β)-ysin(β); 
            y1=ycos(β)+xsin(β);
         */
        while(_parent)
        {

            pos.x=_parent.scaleX*pos.x;
            pos.y=_parent.scaleY*pos.y;
            
            
            let _x=pos.x;
            let _y=pos.y;

            pos.x=_x*Math.cos(_parent.rotation)-_y*Math.sin(_parent.rotation); 
            pos.y=_y*Math.cos(_parent.rotation)+_x*Math.sin(_parent.rotation); 

            pos.x+=_parent.x;
            pos.y+=_parent.y;
            pos.scaleX*=_parent.scaleX;
            pos.scaleY*=_parent.scaleY;
            pos.rotation+=_parent.rotation;
            pos.alpha*=_parent.alpha;
            //pos.width*=pos.scaleX;
            //pos.height*=pos.scaleY;
            _parent=_parent.parent;
        }
        return pos;
    }
    get classname(){
        return this._className;
    }
    
    

}
export default DisplayObjectContainer;