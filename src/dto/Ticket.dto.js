export default class TicketDTO {
    static getTicketInputFrom = (ticket) =>{
        return {
            code : ticket.code,
            amount : ticket.amount || 0,
            purchaser : ticket.purchaser,
            purchase_datetime: ticket.purchase_datetime || ''
        }
    }
}