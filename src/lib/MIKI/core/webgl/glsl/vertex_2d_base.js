export default `
attribute vec2 a_position;
varying vec4 v_color;
attribute vec4 a_color;
uniform float a_alpha;
varying vec2 v_texCoord;
varying float v_alpha;


attribute vec2 a_textCoord;
//贴图
uniform sampler2D u_image;
//webgl 坐标-页面坐标间的转换
uniform vec2 u_resolution;
//提供平面转换
uniform mat3 u_matrix;


void main(){
    //坐标转换;
    vec2 toposition =(u_matrix * vec3(a_position, 1)).xy;
    vec2 zeroToOne = toposition / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    
    vec4 position=vec4(clipSpace*vec2(1,-1), 0, 1);
    gl_Position=position;
    v_alpha=a_alpha;
    v_color= a_color;
    //贴图
    v_texCoord=a_textCoord;
}
`