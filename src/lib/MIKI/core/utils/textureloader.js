
import h5texrure from '../texture/h5texture.js'
import loader from './loader';
import { ShinEvent } from 'shinevent';
import {canvasBuffer} from './canvasBuffer'

class textureloader extends loader
{
    constructor(src){
        super();
        this.src=src;
        this.img=new Image();
      
        this.img.onload=(e)=>{
           
            this.handleLoaded(e)
            this.img.crossOrigin="*";
            this.img.setAttribute('crossOrigin',"*");
            
        }
        
    }
    async getURLBase64(url) {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest()
          xhr.open('get', url, true)
          xhr.responseType = 'blob'
          xhr.onload = function() {
            if (this.status === 200) {
              var blob = this.response
              var fileReader = new FileReader()
              fileReader.onloadend = function(e) {
                var result = e.target.result
                resolve(result)
              }
              fileReader.readAsDataURL(blob)
            }
          }
          xhr.onerror = function() {
            reject()
          }
          xhr.send()
        })
      }
    handleLoaded(e){
        let cb=new canvasBuffer();
        let img=cb.drawImage(this.img);
        this.texture=new h5texrure(img);
        
        this.dispatchEvent(new ShinEvent('loaded',this.texrure));

    }
    load(src){
       
        src=src || this.src;
        this.img.crossOrigin="*";
        this.img.setAttribute('crossOrigin',"*");
        this.img.src=src;
        
    }
    get texture(){
        return this._texture;
    }
    set texture(val){
        this._texture=null;
        this._texture=val;     
    }
    async load(src){
        src=src || this.src;
        //console.log(src);
        
        return new Promise((ros,jet)=>{
            try{
                var img=new Image();
                img.crossOrigin="*";
                img.setAttribute('crossOrigin',"*");
                img.onload=()=>{

                    this.texture=new h5texrure(img);
                    this.dispatchEvent(new ShinEvent('loaded',this.texrure));
                    ros();
                };
                img.onerror=()=>{
                    this.texture=null;
                    ros()
                }
                img.src=src;
            }
            catch(e)
            {
                jet(e);
            }
           
        });
    }
  
}
export default textureloader