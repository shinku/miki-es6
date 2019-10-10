class drawer{
    construct(){

    }
    static getRect(x,y,width,height){
        x=x || 0;
        y=y || 0;
        return [
            x,y,
            x+width,y,
            x,y+height,
            //x,y+height,
            //x+width,y,
            x+width,y+height
        ]
    }
    static createTextureBuffer(gl,img,textureLocation){
        img.crossOrigin="";
        img.setAttribute('crossOrigin',"");
        let tex=gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        // 将图像上传到纹理
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        //创建矩形缓冲；为矩形缓冲提供顶点坐标
        var texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0.0,  0.0,
            1.0,  0.0,
            0.0,  1.0,
            //0.0,  1.0,
            //1.0,  0.0,
            1.0,  1.0]), gl.STATIC_DRAW);
        
        gl.enableVertexAttribArray(textureLocation);
        gl.vertexAttribPointer(textureLocation, 2, gl.FLOAT, false, 0, 0);
        texCoordBuffer=null;
        return tex;
    }
    static drawTexture(gl,texturebuffer){
        //绑定贴图缓存
        gl.bindTexture(gl.TEXTURE_2D, texturebuffer);
        gl.drawElements(gl.TRIANGLES, 6,  gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
    static createIndexBuffer(gl){
        if(!drawer.indexBuffer)
        {
            drawer.indexBuffer=gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawer.indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array([
                0, 1, 2,
		        1, 3, 2
            ]), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawer.indexBuffer)
        return drawer.indexBuffer;
    }
    static uploadTexture(gl,displayobject,img){
        
        let {textureBuffer}=displayobject;
        gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
        // 将图像上传到纹理
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.bindTexture(gl.TEXTURE_2D, null);
        
        
    }
    static applyFunc(){
        
    }
    static drawLine(gl,positions){
        gl.drawArrays(gl.LINE,0,positions.length/2);
    }
    static createColorBuffer(gl,colorpositionlocation,color){
        //console.log(colorpositionlocation);
        //return;
        color=color || 0xffffffff;
        if(!drawer.colorbuffer)
        {
            drawer.colorbuffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,drawer.colorbuffer);
            gl.enableVertexAttribArray(colorpositionlocation);
            let size = 4;          // 4 components per iteration
            let type = gl.FLOAT;   // the data is 32bit floats
            let normalize = false; // don't normalize the data
            let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
            let offset = 0;        // start at the beginning of the buffer
            gl.vertexAttribPointer(
                colorpositionlocation,
                size,
                type,
                normalize,
                stride,
                offset);
            gl.bindBuffer(gl.ARRAY_BUFFER,drawer.colorbuffer);
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
        
                    1.0,  1.0,  1.0,  1.0, 
                    1.0,  1.0,  1.0,  1.0, 
                    1.0,  1.0,  1.0,  1.0, 
                    1.0,  1.0,  1.0,  1.0,
                    
            ]),gl.STATIC_DRAW);
            return; 
        };
        gl.bindBuffer(gl.ARRAY_BUFFER,drawer.colorbuffer);
        
       
      
    }
    static uploadVert(gl,positionLocation,positions)
    {
        if(!drawer.vertexBuffer)
        {
            drawer.vertexBuffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,drawer.vertexBuffer);
            gl.enableVertexAttribArray(positionLocation);
            let size = 2;          // 2 components per iteration
            let type = gl.FLOAT;   // the data is 32bit floats
            let normalize = false; // don't normalize the data
            let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
            let offset = 0;        // start at the beginning of the buffer
            gl.vertexAttribPointer(
                positionLocation,
                size,
                type,
                normalize,
                stride,
                offset);
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER,drawer.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions), gl.STATIC_DRAW);
    }
   
}
export {drawer}