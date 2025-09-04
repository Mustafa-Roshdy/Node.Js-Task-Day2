const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { json } = require('express')

// Get all users
async function getAllUsers() {
    return await User.find()
}

// Login
async function authLogin(userEmail, userPass) {
    try {
        const user = await User.findOne({ email: userEmail })
        if (!user) {
            return { error: "User Not Found" }
        }

        const matchPass = await bcrypt.compare(userPass, user.pass)
        if (!matchPass) {
            return { error: "Invalid password" }
        }

        const payload = {
            email: user.email,
            pass: user.pass
        }
        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        )

        return {
            message: "Login Successfully",
            token: token
        }
    } catch (err) {
        return { error: "Login failed", details: err.message };
    }
}

// Get user by id
async function getUserById(id) {
    return await User.findById(id)
}

// Create new User
async function createUser(user) {
    return await User.create(user)
}

// Update User Data by id
async function updateUser(id, newUserData) {
    return await User.findByIdAndUpdate(id, newUserData, { new: true })

}

// Delete User by id
async function deleteUser(id) {
    return await User.findByIdAndDelete(id)
}

function authMiddleware(req, res, next) {

    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    // header structure must be in "Authorization: Bearer Token"
    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }

    try {

        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
    } catch (err) {
        return res.status(401).json({ error: " invalid token or expired" })
    }

}

module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser, authLogin, authMiddleware }