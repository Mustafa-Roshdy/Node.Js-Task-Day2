const mongo = require('mongoose')
const userSchema= mongo.Schema({
    name:String,
    email: String,
    pass:String,
    phone:String,
})

const User = mongo.model("User",userSchema)

module.exports=User