'use strict'

const ElectionEvent = require('./electionEvent.model')

const create = async (req, res) => {
    try {
        const isAdmin = req.user
        if(!isAdmin) {
            return res.status(401).json({
                status: 401,
                message: 'No permission'
            })
        }
        
        const { name, startTime, endTime } = req.body
        const event = new ElectionEvent({
            name,
            startTime,
            endTime,
            isActive: true
        })

        const result = await event.save()
        return res.json({
            status: 200,
            event: result
        })
    } catch(error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}

module.exports = {
    create
}