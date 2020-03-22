'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    links: [{ type: mongoose.Types.ObjectId, ref: 'Link' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
