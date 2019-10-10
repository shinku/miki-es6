import sprite from './sprite'
import {ShinTimeEvent} from 'shintimeline'
class framesSprite extends sprite{
    constructor(){
        super();
        this.framestags={};
        this.frames=[];
        this.currenttag="";
        this.addEventListener(ShinTimeEvent.FRAME,this.onFrame,this);
        this.tagindex=0;
        this.playstatus='stop';
        this.time=Date.now();
        //console.log(this.DisplayObjecthandleFrame)
        this._className='framesprite';
    }
    onFrame(e){
        //console.log(1111);
        this.update();
    }
    addTag(texture,tagname){
        this.frames.push(texture);
        if(!this.framestags[tagname])
        {
            this.framestags[tagname]=[];
        }
        this.framestags[tagname].push(texture);
    }
    addTagByGroup(group,tagname){
        for(var i=0;i<group.length;i++)
        {
            this.addTag(group[i].texture,tagname)
        }
    }
    playTagName(tagname){
       
        if(this.currenttag==tagname) return;
        this.currenttag=tagname;
        this.time=Date.now();
        let arr=this.framestags[this.currenttag] || this.frames;
        this.tagindex=0;
        this.texture=arr[this.tagindex];
        this.playstatus='play';
    }
    pause(){
        this.playstatus='stop';
    }
    update(){
        if(this.playstatus=='stop') return;
        let time=Date.now();
        let timede=time-this.time;
        if(timede>=100)
        {
            this.time=time;
           
            let arr=this.framestags[this.currenttag] || this.frames;
            this.tagindex++;
            if(this.tagindex>=arr.length)
            {
                this.tagindex=0;
            }
            this.texture=arr[this.tagindex];
            //console.log(this.texture);
            //this.texture=this.ta
        }
    }

}
export default framesSprite