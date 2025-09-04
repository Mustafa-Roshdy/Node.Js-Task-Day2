const mongo = require('mongoose')

const accountSchema = mongo.Schema({
    balance: Number,
    user: {
        type: mongo.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }
})

const Account = mongo.model("Account", accountSchema)

module.exports = Account