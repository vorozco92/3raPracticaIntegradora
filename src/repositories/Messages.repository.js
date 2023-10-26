import getDAOS from "../dao/factory.js";
import MessageDTO from "../dto/Message.dto.js";

const { messagesDAO } = getDAOS();

export class MessagesRepository{

    constructor(){
        this.dao= messagesDAO;
    }

    async getAllMessages(){
        return await this.dao.get();
    }

    async saveMessage(payload){
        const messagePayload =  MessageDTO.getMessageInputFrom(payload)
        return await this.dao.save(messagePayload)
    }

}