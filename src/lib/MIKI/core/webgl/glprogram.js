class glprogram{
    constructor(){

        

    }
    static init(context,program)
    {
        glprogram.context=context;
        glprogram.program=program;
        context.useProgram(program);
        
    }
}
export {glprogram};