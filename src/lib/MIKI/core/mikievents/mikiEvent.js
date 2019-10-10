import { ShinEvent } from "shinevent";

class mikiEvent extends ShinEvent
{

    constructor(type,data){
       
        super(type)
        this.data=data;
    }
}
export {mikiEvent}