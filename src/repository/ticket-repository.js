const {NotificationTicket} = require('../models/index');
const {Op} = require('sequelize');
class TicketRepository {
    
    async getAll() {
        try {
            const Tickets = NotificationTicket.findAll();
            return Tickets;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async create(data) {
        try {
            const ticket = await NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            throw error;
        }
    }
    async get(filter) {
        try {
            const tickets = await NotificationTicket.findAll({
                where:{
                    status:filter.status,
                    notificationTime:{
                        [Op.lte] :new Date()
                    }
                }
            })
            return tickets;
        } catch (error) {
            throw error;
        }
    }
    async updateTicket(ticketId,data) {
        try {
            const ticket = await NotificationTicket.findByPk(ticketId);
            if(data.status) {
                ticket.status = data.status;
            }
            ticket.save();
            return ticket;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = TicketRepository;