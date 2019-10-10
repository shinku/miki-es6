
class programBaseLocations{
    constructor(gl,program){
    }
    static initPosition(gl,program){
        let positionLocation=gl.getAttribLocation(program, 'a_position');
        let textureLocation=gl.getAttribLocation(program,'a_textCoord');
        let resolutionLocation = gl.getUniformLocation(program,'u_resolution');
        let u_matrix = gl.getUniformLocation(program,'u_matrix');
        let a_color=gl.getAttribLocation(program,'a_color')
        let a_alpha=gl.getUniformLocation(program,'a_alpha');
        let u_color=gl.getUniformLocation(program,'u_color');
        let locations= {
            positionLocation,
            textureLocation,
            resolutionLocation,
            u_matrix,
            a_color,
            a_alpha,
            u_color
        }
        gl.useProgram(program);
        programBaseLocations.locations=locations;
    }
   
}
export {programBaseLocations}