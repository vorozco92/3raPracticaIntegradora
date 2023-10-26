import {Router} from "express"
import { MessagesRepository } from "../repositories/Messages.repository.js";

const router = Router();
const messagesRepository = new MessagesRepository()

router.get('/',async(req,res)=>{

    req.app.io.on('connection', socket => {
        console.log("Nuevo cliente conectado")
      
        socket.on('message', data => {
            //messages.push(data);
            console.log(data)
            messagesRepository.saveMessage(data).then((result) => {
                let messages = messagesRepository.getAllMessages().then((result) => {
                    req.app.io.emit('messagesLogs',result);  
                    console.log('messaes tow::'+result)   
                
                }).catch((err) => {
                    
                });
            });
           
        })
    
        socket.on('newUser', data => {
            console.log('Se conecto un nuevo usuario');
            socket.broadcast.emit('newUserFront',data);
            console.log(data)
            let messages = messagesRepository.getAllMessages().then((result) => {
                req.app.io.emit('messagesLogs',result);  
                console.log('messaes:'+result)   
            }).catch((err) => {
                
            });
                    
        })
        
    })


    res.render('chat',{'messages':[]})
})



export default router;