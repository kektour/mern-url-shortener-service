'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

router.post(
  '/register',
  [check('email', 'Invalid email').isEmail(), check('password', 'Invalid password').isLength({ min: 6 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Invalid login data' });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'User exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      return res.status(201).json({ message: 'User created' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Invalid email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Invalid password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Invalid registration data' });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return res.status(400).json({ message: 'Invalid password, try again' });
      }
      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });
      return res.json({ token, userId: user.id });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
