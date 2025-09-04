const express = require('express');
const accountController = require('../controllers/accountController');
const accountValid = require('../validation/accountValidation');
const route = express.Router();

// CREATE account
route.post('/accounts', async (req, res) => {
  const { error } = accountValid.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  const account = await accountController.createAccount(req.body);
  res.json(account);
});

// Get all accounts
route.get('/accounts', async (req, res) => {
  const accounts = await accountController.getAllAccounts();
  res.json(accounts);
});

// READ account by userId
route.get('/accounts/:userId', async (req, res) => {
  const account = await accountController.getAccount(req.params.userId);
  if (!account) {
    return res.status(404).json({ error: "Account not found" })
  }
  res.json(account);
});

// Deposit
route.patch('/accounts/:userId/deposit', async (req, res) => {
  if (!req.body.amount || req.body.amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0" });
  }

  try {
    const account = await accountController.deposit(req.params.userId, req.body.amount);
    res.json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Withdraw
route.patch('/accounts/:userId/withdraw', async (req, res) => {
  if (!req.body.amount || req.body.amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0" });
  }

  try {
    const account = await accountController.withdraw(req.params.userId, req.body.amount);
    res.json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Transaction
route.patch('/accounts/transaction', async (req, res) => {
  const { senderID, receiverID, amount } = req.body;
  if (!senderID || !receiverID || !amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid transaction data" });
  }

  try {
    const result = await accountController.transaction(senderID, receiverID, amount);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE account
route.delete('/accounts/:id', async (req, res) => {
  const account = await accountController.deleteAccount(req.params.id);
  if (!account) return res.status(404).json({ error: "Account not found" });
  res.json({ message: "Account deleted", account });
});

module.exports = route;
