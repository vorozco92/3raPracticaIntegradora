import ticketModel from "../../models/schemas/ticket.schema.js";
export class Tickets{
    constructor(){
        console.log("Trabajando con Mongo")
    }
    // get
    get=async()=>{
        let tickets =await ticketModel.find().lean();
        return tickets;
    }
    //create 
    save=async(ticket)=>{
        let result =await ticketModel.create(ticket);
        return result;
    }

}