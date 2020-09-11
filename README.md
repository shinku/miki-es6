## es6 开发的 2d webgl 游戏渲染引擎。
目前还没有通过webpack 打包成单独的es6 模块。

可以先作为源码导入到工程项目，与工程一起打包

具体使用方法
```javascript
import {

    miki,
    stage,
    resource,
    h5texture,
    texture,
    minkpoint,
    DisplayObject,
    DisplayObjectContainer,
    sprite,
    frameSprite,
    textField

}
 from "./lib/MIKI/";
 //shintimeline是一个时间轴模块，方便在时间轴中控制动画。
 //当前sample 中可以用来实现控制miki渲染：miki.render。
import { ShinTimeLine, ShinTimeEvent } from "shintimeline";
miki.init(document.getElementById('mycanvas'),'webgl');
window.onAnimationFrame=(e)=>{
    miki.render();
}
ShinTimeLine.addEventListener(ShinTimeEvent.FRAME,window.onAnimationFrame,window);
let txt=new textField();
txt.text="hello";
let text2= new textField();
text2.text='shin';
text2.y=50;
stage.addChild(txt);
stage.addChild(text2);
```
