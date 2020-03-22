'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Auth fail' });
    }
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Auth fail' });
  }
};
