export default class MessageDTO {
    static getMessageInputFrom = (message) =>{
        return {
            user :  message.user,
            message: message.message,
            date_send: message.date_send  || ''
        }
    }
}