## es6 开发的 2d webgl 游戏渲染引擎。
目前还没有通过webpack 打包成单独的es6 模块。

可以先作为源码导入到工程项目，与工程一起打包

更多内容可查看 [miki使用手册](https://github.com/shinku/miki-es6/wiki)
使用方法
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
//新建一个文本
let txt=new textField();
//文本内容为hello
txt.text="hello";
let text2= new textField();
 //新建一个文本
text2.text='shin';
//文本内容为shin
text2.y=50;
//stage中增加两个文本元素
stage.addChild(txt);
stage.addChild(text2);
//
```

