'use strict';

const Constants = require('../constants');
const Candidate = require('./candidate.model')
const User = require('../user/user.model')

const list = async (req, res) => {
    try {
        const candidates = await Candidate.find({})
        return res.json({
            status: 200,
            candidates: candidates
        })
    } catch(error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}

const register = async (req, res) => {
    try {
        const { name } = req.body
        const { userId } = req.user
        const admins = await User.find({ isAdmin: true })

        // Create new wallet with multiple signature key with candidate and admin
        const adminsWithAccountId = admins.filter((item) => item.accountId)
        
    } catch(error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}


module.exports = {
    list,
    register
}