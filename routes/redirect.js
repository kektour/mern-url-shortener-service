'use strict';

const express = require('express');
const router = express.Router();

const Link = require('../models/Link');

router.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });
    if (!link) {
      return res.status(404).json({ message: 'Link found' });
    }

    link.clicks += 1;
    await link.save();
    res.redirect(link.from);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
