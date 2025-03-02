const cron = require('node-cron');
const TicketService = require('../services/emailServices');
const sender = require('../config/email-config');

const setupJobs = ()=>{
    cron.schedule('*/5  * * * *', async () => {
        const response = await TicketService.fetchPendingEmails();
        response.forEach((email) => {

            sender.sendMail({

                to:email.recepientEmail,
                subject:email.subject,
                text:email.content


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