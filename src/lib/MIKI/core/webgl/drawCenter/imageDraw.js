
import {programBaseLocations} from '../programBaseLocations'
import {drawer} from './drawer';
import {m3d} from './m3d'
import textField from "../../../dispay/textfield";
//加载着色器utils
import {shaderUtils} from '../glsl/shaderUtils'
import {gco,gct} from '../../../dispay/gco'
class imageDraw{
    construct(){

    }
    static drawGraphics(context,displayobject,options){

        let {graphics} = displayobject;
        let {drawcommander} = graphics;
        let program=shaderUtils.getProgram(context,0);
        if(!program) return;
        let {
            positionLocation,
            textureLocation,
            resolutionLocation,
            u_matrix,
            a_color,//顶点color 属性
            a_alpha,
            u_color//uniform color
        }=programBaseLocations.locations;

        let ox=displayobject.originPositionX;
        let oy=displayobject.originPositionY;
        let {
            x,y,width,height,scaleX,scaleY,rotation,alpha
        }=options;
        let transmax=m3d.transation(x+ox*width,y+oy*height);
        let transmaxoffset=m3d.transation(-x-width*ox,-y-height*oy);
        let scalemax=m3d.scale(scaleX,scaleY);
        let rotationmax=m3d.rotate(-rotation);
        let matrix=m3d.multiply(transmax,rotationmax);
        matrix=m3d.multiply(matrix,scalemax);
        matrix=m3d.multiply(matrix,transmaxoffset);
        matrix=m3d.multiply(matrix,m3d.transation(x,y));
        context.uniformMatrix3fv(u_matrix,false,matrix);
        //let positions=drawer.getRect(0,0,width,height);
        var positions=[];
        for(var i=0;i<drawcommander.length;i++)
        {
            //console.log(drawcommander);
            //switch(drawcommander[i].)
            let command=drawcommander[i];
            let {params}=command;
            drawer.createColorBuffer(context,a_color);
            switch(command.type)
            {
                case gct.BEGINPATH:positions=[];break;
                case gct.MOVETO:positions=[];positions.push(params[0],params[1]);break;
                case gct.LINETO:positions.push(params[0],params[1]);break;
                case gct.STOKE:imageDraw.drawLine(context,positions,positionLocation);
            }
        }
    }
    static drawLine(context,positions,positionLocation){
        //drawer.createColorBuffer(context,a_color,a_color);
       
        drawer.uploadVert(context,positionLocation,positions);
        drawer.drawLine(context,positions);
    }
    static draw(context,displayobject,options){
        //console.log(displayobject.isnewtexture);
        //获取program;
        //默认的program 的type 为0
        let program=shaderUtils.getProgram(context,0);
        if(!program) return;
        if(!displayobject.visible) return;
        let {texture} = displayobject.texture;
        //如果贴图不存在，则retun 退出
        if(!texture) return;
        //获取各个location
        let {
            positionLocation,
            textureLocation,
            resolutionLocation,
            u_matrix,
            a_color,//顶点color 属性
            a_alpha,
            u_color//uniform color
        }=programBaseLocations.locations;
        //获取到context对象
        let ox=displayobject.originPositionX;
        let oy=displayobject.originPositionY;
        let {
            x,y,width,height,scaleX,scaleY,rotation,alpha
        }=options;
        let transmax=m3d.transation(x+ox*width,y+oy*height);
        let transmaxoffset=m3d.transation(-x-width*ox,-y-height*oy);
        let scalemax=m3d.scale(scaleX,scaleY);
        let rotationmax=m3d.rotate(-rotation);
        let matrix=m3d.multiply(transmax,rotationmax);
        matrix=m3d.multiply(matrix,scalemax);
        matrix=m3d.multiply(matrix,transmaxoffset);
        matrix=m3d.multiply(matrix,m3d.transation(x,y));
        
       
        context.uniformMatrix3fv(u_matrix,false,matrix);
        let positions=drawer.getRect(0,0,width,height);
        drawer.createColorBuffer(context,a_color);
        
        drawer.uploadVert(context,positionLocation,positions);

        if(!displayobject.textureBuffer)
        {
            //获取贴图缓冲
            displayobject.textureBuffer=drawer.createTextureBuffer(context,texture,textureLocation);
            drawer.uploadTexture(context,displayobject,texture);
        }
        if(displayobject.isnewtexture===true){
            //更新贴图
            //判断当前元素的贴图是否是更新的，正对频繁变换的贴图元素，增加对应的判断。
            drawer.uploadTexture(context,displayobject,texture);
            //绘制一次用，则设置当前元素的贴图为老贴图。
            displayobject.isnewtexture=false;

        }
        //透明材质提贴图配置
        //上传透明度
        context.uniform1f(a_alpha,parseFloat(alpha));
        //上传并绑定索引数据
        drawer.createIndexBuffer(context);
        
        drawer.drawTexture(context,displayobject.textureBuffer)
    }
}
export {imageDraw}