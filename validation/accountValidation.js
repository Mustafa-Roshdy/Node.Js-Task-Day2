const validator = require('joi')

const accountValid = validator.object({
    balance: validator.number().min(0),
    user: validator.string().required()
})

module.exports = accountValid