'use strict'

const express = require('express')
const controller = require('./candidate.controller')
const router = express.Router()

router.route('/list')
    .get(controller.list)

router.route('/register')
    .post(controller.register)

module.exports = router