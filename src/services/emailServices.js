const sender = require('../config/email-config');
const TicketRepository = require('../repository/ticket-repository');
const repo = new TicketRepository();
const sendBasicEmail = async (mailFrom,mailTo,mailSubject,mailBody) => {
    try {
        const response = await sender.sendMail({
        from:mailFrom,
        to:mailTo,
        subject:mailSubject,
        text:mailBody
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    } 
};

const fetchPendingEmails = async(timeStamp) => {
    
    try {
        
        const tickets = await repo.get({status:"PENDING"});
        return tickets;
    } catch (error) {
        console.log(error);
        throw error;
    }
} 

const createNotitfication = async(data) =>{
    try {
        
        const response = await repo.create(data);
        return response;
        
    } catch (error) {
        throw error;
    }
}

const updateTicket = async(ticketId,data)=>{
    try {
        
        const response = await repo.updateTicket(ticketId,data);
        return response;
        
    } catch (error) {
        throw error;
    }
}
module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotitfication,
    updateTicket
}