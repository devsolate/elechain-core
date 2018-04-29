'use strict'

const Constants = require('../src/constants')
const mongoose = require('mongoose');
mongoose.connect(Constants.MONGODB_URI);

const User = require('../src/user/user.model')

const run = async () => {
    // Create First Admin Account
    
    try {
        const user = await User.create({
            username: "admin",
            password: "admin1234",
            name: "SuperAdmin",
            isAdmin: true,
            accountId: "GA5PSJHGWITNDQGJQSRXD5DJVDAUUFB66AUPQIIGPKQTRZLWNZQ54QGS"
        })

        console.log("create super admin succes")
    } catch(error) {
        console.log(error)
    }
}

run()