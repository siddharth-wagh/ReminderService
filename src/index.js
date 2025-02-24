const express = require('express');
const bodyParser =require('body-parser');
const { PORT } = require('./config/serverconfig');
const {sendBasicEmail} = require('./services/emailServices');
const cron = require('node-cron');






const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT,()=>{
        console.log(`Server started at PORT ${PORT}`);

        // sendBasicEmail(
        //     "Support<AirlineSupport>",
        //     "siddhu27112004@gmail.com",
        //     "Testing the working of email sending",
        //     "Hey, This email is send to ensure that the nodemailsender is working properly"
        // )

       

        cron.schedule('*/2 * * * * *', () => {
            console.log('running a task every minute');
        });
    })
}

setupAndStartServer();