'use strict'

require('dotenv').config()

module.exports = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    SESSION_SECRET: process.env.SESSION_SECRET,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    STELLAR_URI: process.env.STELLAR_URI,
    COIN: {
        VOTED: process.env.VOTED_COIN_NAME,
        ISSUER: process.env.VOTED_COIN_ISSUER
    }
}