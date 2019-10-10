export default `
precision mediump float;
uniform sampler2D u_image;

varying vec2 v_texCoord;
varying vec4 v_color;
varying float v_alpha;
uniform vec4 u_color;

void main(){
    vec4 aaflag;
    if(u_color[3]==1.0)
    {
        aaflag=u_color;
    }
    else{
        aaflag=texture2D(u_image, v_texCoord);
    }
    if(v_alpha<1.0)
    {
        gl_FragColor=aaflag*v_alpha;
    }
    else{
        gl_FragColor =aaflag;
    }
    if (gl_FragColor.a == 0.0) {
        discard;
    }
    
  
}
`