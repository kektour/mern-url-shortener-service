'use strict';

const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    clicks: {
      type: Number,
      default: 0
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Link', linkSchema);
