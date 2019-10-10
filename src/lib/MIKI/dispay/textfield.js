import DisplayObject from "../core/DisplayObject";
import { textTexTure } from "../core/texture/textTexture";

class textField extends DisplayObject
{
    constructor(debug){
       
        super();
        this.debug=debug;
        this.text="";
        this.fontFamily="arial";
        this.fontSize="50px";
        this._className='textfield';
        this.width=300;
        this.height=50;  
        this.iss=0;
        this.autoWrap=false;
        this.textColor='#000000';
        this.isnewtexture=false;
        this.spacebetween=1;
        this.linebetween=1;
        //this.texture is a textTexture
      
        this.texture=new textTexTure(
            {
                width:this.width,
                height:this.height,
                fontSize:this.fontSize,
                fontFamily:this.fontFamily,
                autoWrap:this.autoWrap,
                fillStyle:this.textColor,
                spacebetween:this.spacebetween,
                linebetween:this.linebetween
            }
        );
        
    }
    info(){
      
    }
    set width(val){
      
        this._width=val;
        this.updateTextureOption();
    }
    get width(){
        return this._width;
    }
    set height(val){
        
        this._height=val;
        this.updateTextureOption();
    }
    get height(){
        return this._height;
    }
    set spacebetween(val){
        this._spb=val;
        this.updateTextureOption();
    }
    get spacebetween(){
        return   this._spb;
    }
    set linebetween(val){
        this._lpb=val;
        this.updateTextureOption();
    }
    get linebetween(){
        return this._lpb;
    }
    updateTextureOption(){
        //console.log(this.texture);
        if(!this.texture) return;
        
        let option= {
            width:this.width,
            height:this.height,
            fontSize:this.fontSize,
            fontFamily:this.fontFamily,
            autoWrap:this.autoWrap,
            fillStyle:this.textColor,
            spacebetween:this.spacebetween,
            linebetween:this.linebetween
        };
        this.texture.option=option;
        if(this.debug) {
            console.log(option);
        }
        //console.log('update');
    }
    set texture(val){
        
        this._texture=val;
        this._texture.addEventListener('textloaded',this.handleTLoaded,this);
        if(this._text) this._texture.text=this._text;
        //console.log(this.texture.textureOption);
    }
    set textureBuffer(val){
        this._textBuffer=val;
    }
    get textureBuffer(){
        return this._textBuffer;
    }
    handleTLoaded(e)
    {
       
        this.isnewtexture=true;
        //this.updateTextureOption();
    }
    get texture(){
        /*return{
            texture:this.text
        }*/
        if(this.debug) {
            //if(this._texture) console.log(this._texture.option);
        }
        return this._texture;
    }
    set textColor(val)
    {
        this._textcolor=val;
        this.updateTextureOption();

    }
    get textColor(){  
        return this._textcolor;
    }
    set autoWrap(val){
        this._autowrap=val;
        this.updateTextureOption();
    }
    get autoWrap(){
        return  this._autowrap;
    }
    get fontDes(){
        return `${this.fontSize} ${this.fontFamily}`;
    }
    addChild(child){
        return;
    }
    removeChild(child)
    {
        return;
    }
    set text(val){

        this._text=val;
        if(this._texture) this._texture.text=this._text;

    }
    get text(){
        return this._text;
    }
    set fontFamily(fontfamily){
        this._fontFamily=fontfamily;
        this.updateTextureOption();
    }
    get fontFamily(){
        return this._fontFamily;
    }
    set fontSize(val){
        
        this._fontsize=val.toString().replace('px','')+"px";
       
        this.updateTextureOption();
    }
    get fontSize(){
        return this._fontsize.toString().replace('px','');
    }
   
   
    
}
export {textField}
export default textField;