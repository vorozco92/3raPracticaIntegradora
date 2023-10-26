import messagesModel from "../../models/schemas/messages.schema.js";

export class Messages{

    constructor(){
        console.log("Estamos trabajando en db mongo");
    }

    get=async()=>{
        let msgs = await messagesModel.find().lean();
        return msgs
    }

    save = async msg=> {
        let result = await messagesModel.create(msg)
        return result
    }

}