const validator=require('joi')

const userValid=validator.object({
    name:validator.string().min(3).max(11).required(),
    email:validator.string().email().required(),
    pass:validator.string().min(6).required(),
    phone:validator.string().pattern(/^[0-9]{11,15}$/).required(),
})


module.exports=userValid