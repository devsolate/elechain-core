'use strict';

const User = require('./user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Constants = require('../constants');
const moment = require('moment');
const Token = require('../token/token.model');
const StellarSdk = require('stellar-sdk');

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body

    try {
        const user = await User.findOne({
            username: username
        })
        if (user) {
            const isPasswordCorrect = await user.comparePassword(password);
            if(isPasswordCorrect) {
                const timestamp = moment().valueOf();
                const token = jwt.sign({
                    _id: user._id,
                    username: user.username,
                    isAdmin: user.isAdmin,
                    accountId: user.accountId,
                    timestamp: timestamp
                }, Constants.JWT_SECRET_KEY);

                await Token.create({
                    token: token,
                    username: user.username,
                    timestamp: timestamp,
                    isRevoked: false
                });

                res.json({
                    status: 200,
                    token: token
                })
            } else {
                res.status(401).json({
                    status: 400,
                    error: 'Username or Password is incorrect'
                })
            }
        } else {
            res.status(401).json({
                status: 400,
                error: 'Username or Password is incorrect'
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            error
        })
    }
}

const register = async (req, res) => {
    const {
        username,
        password,
        name,
        accountId
    } = req.body

    try {
        const generateKeyPair = StellarSdk.Keypair.random()
        const user = await User.create({
            username,
            password,
            name,
            accountId: accountId
        })

        res.json({
            status: 200,
            user: {
                accountId: user.accountId,
                username: user.username,
                name: user.name
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            error
        })
    }
}

module.exports = {
    login,
    register
}