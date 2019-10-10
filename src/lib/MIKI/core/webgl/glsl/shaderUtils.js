import { vertex_2d,
    fragment_2d
} from './index'
import {programBaseLocations} from '../programBaseLocations'
class shaderUtils{
    
    static getProgram(gl,type='0')
    {
        if(!shaderUtils.programs) shaderUtils.programs={};
        //console.log('12312312');
        switch(type.toString())
        {
            //default
            case "0":
                if(!shaderUtils.programs[type])
                {
                    let program=shaderUtils.getShader(gl,vertex_2d,fragment_2d);
                    shaderUtils.programs[type]=program;
                    programBaseLocations.initPosition(gl,program);
                    let {resolutionLocation} =  programBaseLocations.locations;
                    //设置着色器内常量
                    gl.uniform2f(resolutionLocation,gl.canvas.width,gl.canvas.height);
                }
               
                break;
            default:
                break;
        }
        return shaderUtils.programs[type];
    }
    static getShader(gl,verterxsrc,fragmentsrc)
    {
        let v_shader=shaderUtils.createShader(gl,gl.VERTEX_SHADER,verterxsrc);
        //加载片段着色器代码
        let f_shader=shaderUtils.createShader(gl,gl.FRAGMENT_SHADER,fragmentsrc);

        let program=gl.createProgram();
        gl.attachShader(program,v_shader);
        gl.attachShader(program,f_shader);
        gl.linkProgram(program);
        let success=gl.getProgramParameter(program, gl.LINK_STATUS);
        if(!success){
            return false;
        }
        return program;
    }
    static createShader(gl,type,source){
     
        let shader=gl.createShader(type,source);
        gl.shaderSource(shader,source);
        gl.compileShader(shader);
        let success=gl.getShaderParameter(shader,gl.COMPILE_STATUS);
        if(success) return shader;
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader)
    }

}
export {shaderUtils}