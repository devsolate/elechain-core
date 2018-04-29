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
    } catch(error){
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

module.exports = {
    list,
    add,
    remove
}

