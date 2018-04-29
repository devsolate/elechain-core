'use strict'

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  startTime: Date,
  endTime: Date,
  isActive: Boolean
}, { timestamps: true });

const event = mongoose.model('Event', eventSchema);

module.exports = event;
