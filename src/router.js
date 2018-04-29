'use strict';

const express = require('express');
const router = express.Router();

router.use('/event', require('./event/event.route'));
router.use('/candidate', require('./candidate/candidate.route'));
router.use('/admin', require('./admin/admin.route'));
router.use('/', require('./user/user.route'));

module.exports = router;