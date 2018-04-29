'use strict'

const express = require('express')
const controller = require('./event.controller')
const router = express.Router()

router.route('/')
    .post(controller.create)

router.route('/result/:eventId?')
    .get(controller.result)

router.route('/end')
    .post(controller.end)

module.exports = router