const express = require('express');
const bodyParser =require('body-parser');
const { PORT } = require('./config/serverconfig');
const {sendBasicEmail} = require('./services/emailServices');


const setupJobs = require('./utils/job');
const TicketController = require('./controllers/ticket-controller');



const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets',TicketController.create);
    app.listen(PORT,()=>{
        console.log(`Server started at PORT ${PORT}`);
        setupJobs();
        // sendBasicEmail(
        //     "Support<AirlineSupport>",
        //     "siddhu27112004@gmail.com",
        //     "Testing the working of email sending",
        //     "Hey, This email is send to ensure that the nodemailsender is working properly"
        // )

       

        
    })
}

setupAndStartServer();