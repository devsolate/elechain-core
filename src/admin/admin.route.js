'use strict'

const express = require('express')
const controller = require('./candidate.controller')
const router = express.Router()

router.route('/list')
    .get(controller.list)

router.route('/add')
    .post(controller.add)

router.route('/remove')
    .post(controller.remove)

module.exports = router