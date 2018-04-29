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

    }
}

const register = async (req, res) => {
    try {
        const { name } = req.body
        const { userId } = req.user
        const admins = await User.find({ isAdmin: true })

        // Create new wallet with multiple signature key with candidate and admin
    } catch(error) {

    }
}


module.exports = {
    list,
    register
}