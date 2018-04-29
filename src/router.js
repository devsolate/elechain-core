'use strict';

const express = require('express');
const router = express.Router();

router.use('/', require('./user/user.route'));

module.exports = router;