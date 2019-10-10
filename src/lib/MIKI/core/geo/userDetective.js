class userDetective {
    
    /**
     *
     *
     * @static
     * @param {x,y} point
     * @param {x,y,width,height,rotation,scale} gm
     * @memberof userDetective
     */
    static isHitTest(p,gm)
    { 
     //console.log(point);
     
     let {x,y,width,height,rotation}=gm;
    
     if(!width || !height) return false;
     let p1={
         x:x,
         y:y
     }
     let p2={
         x:x+width,
         y:y
     }  
     let p3={
         x:x,
         y:y+height
     }
     let p4={
         x:x+width,
         y:y+height
     }
     if(p.x>p1.x && p.y>p1.y 
        && p.x<p2.x && p.y>p2.y 
        && p.x>p3.x && p.y<p3.y 
        && p.x<p4.x && p.y<p4.y) return true;
     return false;
    }
    
}
export {userDetective}