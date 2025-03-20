const cron = require('node-cron');
const TicketService = require('../services/emailServices');
const sender = require('../config/email-config');

const setupJobs = ()=>{
    cron.schedule('*/1  * * * *', async () => {
        const response = await TicketService.fetchPendingEmails();
        response.forEach((email) => {

            sender.sendMail({

                to:email.recepientEmail,
                subject:email.subject,     
                html: `<h1>Failure</h1><p>${email.content}</p>`
           }, async (err,data)=>{

                if(err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                    await TicketService.updateTicket(email.id,{status:"SUCCESS"});
                }
           })
        });
        console.log(response);
    });
}

module.exports = setupJobs;