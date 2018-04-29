'use strict'

const mongoose = require('mongoose');

const electionEventSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  startTime: Date,
  endTime: Date,
  isActive: Boolean
}, { timestamps: true });

const event = mongoose.model('ElectionEvent', electionEventSchema);

module.exports = event;
