import getDAOS from "../dao/factory.js";
import TicketDTO from "../dto/Ticket.dto.js";

const { ticketsDAO } = getDAOS();

export class TicketsRepository{

    constructor(){
        this.dao= ticketsDAO;
    }

    async getAllTickets(){
        return await this.dao.get();
    }

    async saveTicket(payload){
        const ticketPayload =  TicketDTO.getTicketInputFrom(payload)
        return await this.dao.save(ticketPayload)
    }

}