'use strict'

const User = require('../user/user.model')

const list = async (req, res) => {
    try {
        const isAdmin = req.user
        if(!isAdmin) {
            return res.status(401).json({
                status: 401,
                message: 'No permission'
            })
        }

        const admins = await User.find({ isAdmin: true })
        return res.json({
            status: 200,
            admins: admins.map((item) => {
                return {
                    _id: item._id,
                    username: item.username,
                    accountId: item.accountId
                }
            })
        })
    } catch(error){
        return res.status(401).json({
            status: 401,
            message: error
        })
    }
}

const add = async (req, res) => {
    try {
        const isAdmin = req.user
        if(!isAdmin) {
            return res.status(401).json({
                status: 401,
                message: 'No permission'
            })
        }

        const { username } = req.body

        const user = await User.findOne({ username: username })
        await user.update({ isAdmin: true })

        return res.json({
            status: 200
        })
    } catch(error){
        console.log(error)
        return res.status(401).json({
            status: 401,
            message: error
        })
    }
}

const remove = async (req, res) => {
    try {
        const isAdmin = req.user
        if(!isAdmin) {
            return res.status(401).json({
                status: 401,
                message: 'No permission'
            })
        }
    } catch(error){
        return res.status(401).json({
            status: 401,
            message: error
        })
    }
}

// Approve Candidate
const approve = (req, res) => {
    try {
        const isAdmin = req.user
        if(!isAdmin) {
            return res.status(401).json({
                status: 401,
                message: 'No permission'
            })
        }

        const { candidateId } = req.body
        
        
    } catch(error){
        return res.status(401).json({
            status: 401,
            message: error
        })
    }
}


module.exports = {
    list,
    add,
    remove,
    approve
}

