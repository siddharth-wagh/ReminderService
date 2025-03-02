const TicketService = require('../services/emailServices');

const create = async(req,res) =>{
    try {
        const response = TicketService.createNotitfication(req.body);
        return res.status(201).json({
            data:response,
            message:"successfully resgistered an email reminder",
            sucess:true,
            error:{}
        })
    } catch (error) {
        return res.status(500).json({
            data:{},
            message:"unable to resgister an email reminder",
            sucess:false,
            error:error
        })
    }
}
module.exports = {
    create
}