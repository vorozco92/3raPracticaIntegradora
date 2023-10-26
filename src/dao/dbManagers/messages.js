import messagesModel from "../models/messages.js";

export default class Messages{

    constructor(){
        console.log("Estamos trabajando en db mongo");
    }

    getAll=async()=>{
        let msgs = await messagesModel.find().lean();
        return msgs
    }

    addMsg = async msg=> {
        let result = await messagesModel.create(msg)
        return result
    }

}