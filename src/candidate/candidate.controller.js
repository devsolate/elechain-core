'use strict';

const Constants = require('../constants');
const Candidate = require('./candidate.model');
const User = require('../user/user.model');
const StellarSDK = require('stellar-sdk');
StellarSDK.Network.useTestNetwork();

const Utils = require('./candidate.utils')
const Event = require('../event/event.model')

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
        const { _id: userId } = req.user
        const admins = await User.find({ isAdmin: true })

        // Create new wallet with multiple signature key with candidate and admin
        const adminsWithAccountId = admins.filter((item) => item.accountId)
        const user = await User.findById(userId)
        const event = await Event.findOne({ isActive: true })
        
        // Create new account with 
        const generateKeyPair = StellarSDK.Keypair.random()
        console.log("New Account:", generateKeyPair.publicKey())
        
        // Connect Stellar Network
        const server = new StellarSDK.Server(Constants.STELLAR_URI)
        await Utils.fund(server, generateKeyPair.publicKey())

        // Create new account and add Admin Signer
        const candidateAccount = await server.loadAccount(generateKeyPair.publicKey())
        const registerXDR = Utils.registerXDR(event.startTime, event.endTime, candidateAccount, generateKeyPair, adminsWithAccountId, user)
        await server.submitTransaction(registerXDR)
        
        return res.json({
            status: 200,
            candidate: {
                accountId: generateKeyPair.publicKey()
            }
        })
    } catch(error) {
        console.log(JSON.stringify(error))
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