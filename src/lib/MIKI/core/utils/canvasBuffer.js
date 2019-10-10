class canvasBuffer{

    /**
     * canvasBuffer作为canvas 缓冲，处理一些内部数据。例如文字绘制，点线的绘制
     */
    constructor(width,height){

        //创建一个离屏的画布，位于内存中;
        this.canvas=document.createElement('canvas');
        this.canvas.width=width || 100;
        this.canvas.height=height || 100;
        this._context=this.canvas.getContext('2d');

    }
    static  urlData(canvas,type='image/jpeg',encoderOptions=0.8){

      
        return canvas.toDataURL(type,encoderOptions);

    }
    drawShapes(commands,){
        
    }
    drawText(text,options)
    {
        /** 
         * options 数据接口
         * {
         * width,//定义整个文本绘制区间的宽高
         * height,
         * fontSize,//文本绘制的字体和字体描述
         * fontFaimily,
         * fillStyle,//文本绘制的颜色描边类型
         * autoWrap://是否自动换行}
        */
       
       let {
           
            width,height,font,fillStyle,fontSize,fontFamily,autoWrap,spacebetween,linebetween

       } = options;
       //console.log(options);
       //给当前画布设置宽高
        this.width=width;
        this.height=height;
        let {context}=this;
        //起始偏移
        let offsetwidth=0;
        let offsetheight=parseInt(fontSize);
        let offsetnum=0;
        //字间距
        //let spacebetween=1;
        //行间距
        //let linebetween=1;
        //清空画布
        context.clearRect(0,0,this.canvas.width,this.canvas.height);
        text=" "+text;
       
        //绘制文字
       
        for(var i=0;i<text.length;i++)
        {
            let word=text.charAt(i);
           
            let word_w=context.measureText(word).width;
            let word_h=parseInt(fontSize);
           
            context.fillStyle=fillStyle;
            //console.log(fontSize+"px "+fontFamily);
            context.font=fontSize+"px  "+fontFamily;
            let _x = offsetwidth;
            //autoWrap=false;
            if((_x+word_w>width && autoWrap) || "\n"===word) {
                offsetnum=0;
                offsetwidth=0;
                _x=0;
                offsetheight+=parseInt(fontSize)+linebetween;
            }
            //console.log(linebetween);
            let _y=offsetheight;
            if(i==0 ||  "\n"===word){
                offsetwidth=0;
                continue;
            } 
            context.fillText(word,_x,_y);
            offsetwidth+=word_w+spacebetween;
        }
    }
    drawImage(img){
        this.canvas.width=img.width;
        this.canvas.height=img.height;
        this._context.drawImage(
            img,0,0,img.width,img.height
        );
        //return this.urlData();
    }
    set width(val){
        
        this.canvas.width=val;

    }
    set height(val){

        this.canvas.height=val;

    }
    async covertoBitMap(){
        
        return new Promise((ros,jet)=>{
            let img=new Image();
            img.onload=()=>{
                ros(img);
            }
            img.src=this.toUrlData();
        });
    }
    get context(){
        return this._context;
    }
   
    toUrlData(type='image/jpeg',encoderOptions=0.8){
        return this.canvas.toDataURL(type,encoderOptions);
    } 


}

export {canvasBuffer}