import {gco,gct} from './gco';
class graphics{
    
    constructor(){
        
        this.drawcommander=[];
    }
    set fillStyle(val)
    {
        this.drawcommander.push(new gco(gct.FILLSTYLE,val));
    }
    set strokeStyle(val)
    {
        this.drawcommander.push(new gco(gct.STROKESTYLE,val));
    }
    get couldGraphics(){
        return this.drawcommander.length>0;
    }
    beginPath(){
        this.drawcommander.push(new gco(gct.BEGINPATH));
    }
    lineTo(x,y){
        this.drawcommander.push(new gco(gct.LINETO,x,y));
    }
    moveTo(x,y)
    {
        this.drawcommander.push(new gco(gct.MOVETO,x,y));
    }
    fill()
    {
        this.drawcommander.push(new gco(gct.FILL));
    }
    endPath(){
        return this.stoke();
    }
    stoke(){
        this.drawcommander.push(new gco(gct.STOKE));
    }
    closePath(){
        this.drawcommander.push(new gco(gct.CLOSEPATH));
    }
    quadraticCurveTo(cpx,cpy,x,y){
        this.drawcommander.push(new gco(gct.QUADRATICURVETO,cpx,cpy,x,y));   
    }
    bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)
    {
        this.drawcommander.push(new gco(gct.BEZIRECURETO,cp1x,cp1y,cp2x,cp2y,x,y)); 
    }
    arc(x,y,r,sAngle,eAngle,counterclockwise=false){
        this.drawcommander.push(new gco(gct.ARC,x,y,r,sAngle,eAngle,counterclockwise)); 
    }
    arcTo(x1,y1,x2,y2)
    {
        this.drawcommander.push(new gco(gct.ARCTO,x1,y1,x2,y2)); 
    }

    
}
export {graphics}