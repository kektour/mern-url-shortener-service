'use strict';

const express = require('express');
const router = express.Router();
const withAuth = require('../middleware/auth');
const config = require('config');
const shortid = require('shortid');

const Link = require('../models/Link');

router.post('/generate', withAuth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;
    const code = shortid.generate();
    const existing = await Link.findOne({ from });
    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + '/' + code;
    const link = new Link({
      code,
      from,
      to,
      owner: req.user.userId
    });
    await link.save();
    return res.status(201).json({ link });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    return res.json(links);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    return res.json(link);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
