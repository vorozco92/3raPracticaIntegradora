import CONFIG from "../config/config.js"
let usersDAO, cartsDAO, messagesDAO, productsDAO, ticketsDAO, linksDAO;

switch(CONFIG.PERSISTENCE){
    case 'MEMORY':{
        
    break;
    }
    case 'MONGO':{
        const { Users } = await import("../dao/mongo/users.mongo.js");
        usersDAO = new Users();

        const { Carts } = await import("../dao/mongo/carts.mongo.js");
        cartsDAO = new Carts();

        const { Products } = await import("../dao/mongo/products.mongo.js");
        productsDAO = new Products();

        const { Messages } = await import("../dao/mongo/messages.mongo.js");
        messagesDAO = new Messages();

        const { Tickets } = await import("../dao/mongo/tickets.mongo.js")
        ticketsDAO = new Tickets();

        const { Links } = await import("../dao/mongo/links.mongo.js")
        linksDAO = new Links();
    break;  
    }
    default:{
        throw new Error("No digitaste una persistencia valida")
        break;
    }
}

const getsDAOS=()=>{
 return { usersDAO, cartsDAO, messagesDAO, productsDAO, ticketsDAO, linksDAO}
}

export default getsDAOS;