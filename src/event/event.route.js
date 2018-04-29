'use strict'

const express = require('express')
const controller = require('./event.controller')
const router = express.Router()

router.route('/')
    .post(controller.create)

module.exports = router