import stage from '../stage'
import { userHands } from './utils/userHands';
import { userDetective } from './geo/userDetective';
class displayTree{
    constructor(){
        this.displaytree=[];
        userHands.getInstance().addEventListener('touchCanvasStart',this.handleCanvasTouch,this);
    }
    handleCanvasTouch(e)
    {
        let {x,y}=e.data;
        let p={x,y};
        let {displaytree}=this;
    }
    buildTree(){
        if(!stage)
        {
            return;
        }
        this.displaytree=[];

        this.scanObject(stage);
       
        return this.displaytree;
    }
    getTree(){
        return this.displaytree;
    }
    scanObject(obj){
        //this.displaytree.push(obj);
        if(obj.visible==false || !obj.visible) return;
        this.displaytree.push(obj);
        //调用before render
        obj.beforeRender();
        let children=obj.children;
        if(!children) return;
        for(var i=0;i<children.length;i++)
        {
            this.scanObject(children[i])
        }
    }
    static getInstance(){
        if(!displayTree._instance)
        {
            displayTree._instance=new displayTree();
        }
        return displayTree._instance
    }
}
export default displayTree.getInstance();