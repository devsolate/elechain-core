'use strict'

const Event = require('./event.model')

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
        const activeEvent = await Event.findOne({ isActive: true })
        if(activeEvent) {
            return res.status(400).json({
                status: 400,
                message: 'Some event already active'
            })
        }

        const event = new Event({
            name,
            startTime,
            endTime,
            isActive: true
        })

        const result = await event.save()
        return res.json({
            status: 200,
            event: {
                name: event.name,
                startTime: event.startTime,
                endTime: event.endTime
            }
        })
    } catch(error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}

const result = async (req, res) => {
    try {
        const { eventId } = req.query
        const event  = eventId ? await Event.findOne({ _id: eventId }) : await Event.findOne().sort({ field: 'asc', _id: -1 })

        return res.json({
            status: 200,
            event
        })
    } catch(error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: error
        })
    }
}

const end = async (req, res) => {
    try {
        const isAdmin = req.user
        if(!isAdmin) {
            return res.status(401).json({
                status: 401,
                message: 'No permission'
            })
        }
        
        const event = await Event.findOne({ isActive: true })
        await event.update({
            isActive: false
        })

        return res.json({
            status: 200
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
    create,
    result,
    end
}