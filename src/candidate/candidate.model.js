'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  accountId: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: Schema.Types.ObjectId, ref: 'ElectionEvent' },
  isActive: Boolean,
  XDR: String,
  signer: Array
}, { timestamps: true });

const candidate = mongoose.model('Candidate', candidateSchema);

module.exports = candidate;
