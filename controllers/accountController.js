const Account = require('../models/accountModel')


// create new Account
async function createAccount(data) {

    return await Account.create(data)
}
// Get account by userId
async function getAccount(userid) {
    return await Account.findOne({ user: userid }).populate("User")
}

// Withdraw
async function withdraw(userid, amount) {
    let account = await Account.findOne({ user: userid })
    account.balance -= Number(amount)
    await account.save();
    return account

}

// Deposit
async function deposit(userid, amount) {
    let account = await Account.findOne({ user: userid })
    account.balance += Number(amount)
    await account.save();
    return account

}

// Transaction
async function transaction(senderID, receiverID, amount) {
    let sender = await Account.findOne({ user: senderID })
    let receiver = await Account.findOne({ user: receiverID })

    sender.balance -= Number(amount)
    receiver.balance += Number(amount)
    await sender.save();
    await receiver.save();

    return { sender, receiver }
}

// Get all accounts
async function getAllAccounts() {
    let account = await Account.find()
    return account
}

// Delete account by id 
async function deleteAccount(id) {
    return await Account.findByIdAndDelete(id)
}

module.exports = { getAccount, withdraw, deposit, transaction, createAccount, getAllAccounts, deleteAccount }