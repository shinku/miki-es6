import {
    vertex_2d,
    fragment_2d
} from './glsl/index';
import {programBaseLocations} from './programBaseLocations'
import {imageDraw} from './drawCenter/imageDraw'
import DisplayObject from '../DisplayObject';
class mikiWebglBase
{
    constructor(canvas){

        //一系列初始化操作
        let options={
            antialias:false,
            stencil:true
        }
        let context=canvas.getContext('webgl',options) ||
         canvas.getContext('experimental-webgl',options);
        this.context=context;
        context.viewport(0,0,context.canvas.width,context.canvas.height);
        //context.enable(context.SAMPLE_ALPHA_TO_COVERAGE);
        context.enable(context.BLEND);
        context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
    }
    //清空画布
    fresh()
    {
        let {context}=this;
        //context.globalCompositeOperation="source-in";
        context.clearColor(0, 0, 0, 0);
        context.clear(context.COLOR_BUFFER_BIT | context.STENCIL_BUFFER_BIT);
        
    }
    //绘制
    drawElement(element,option){
        
        let {context}=this;
        let {texture}=element;
        if(element.graphics.drawcommander.length>0)
        {
           // console.log(element.graphics.drawcommander);
           imageDraw.drawGraphics(context,element,option)
        }
        if(!texture) return;
        imageDraw.draw(context,element,option); 
    }
    enableStencil(){
        let {context}=this;
        let gl=context;
        //开启模板检测
        gl.enable(gl.STENCIL_TEST);
    }
    disableStencil(){
        let {context}=this;
        let gl=context;
        //开启模板检测
        gl.disable(gl.STENCIL_TEST);
    }
    //设置遮罩
    maskerStart(){
        let {context}=this;
        let gl=context;
        gl.stencilFunc(gl.ALWAYS, 1.0, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        gl.stencilMask(0xff);
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.colorMask(0, 0, 0, 0);
    }
    //设置遮罩over
    maskerEnd(){
        let {context}=this;
        let gl=context;
        //console.log('关闭模板检测');
        gl.stencilFunc(gl.EQUAL, 1, 0xFF);
        gl.stencilMask(0x00);
        gl.colorMask(1, 1, 1, 1);
      
    }
    
    static createShader(gl,type,source){
     
        let shader=gl.createShader(type,source);
        gl.shaderSource(shader,source);
        gl.compileShader(shader);
        //return shader;
        let success=gl.getShaderParameter(shader,gl.COMPILE_STATUS);
        
        if(success) return shader;
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader)
        
    }
    static createPrograms(){


    }
}
//console.log(mikiWebglBase);
export {mikiWebglBase}