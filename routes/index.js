const router = require('express').Router();
const path = require('path');
const apiRoutesStaff = require('./api/staff.js');
const apiRoutesParent = require('./api/parent.js');
const authRoutes = require('./auth/auth.js');
const express = require('express');

router.use('/api', apiRoutesStaff);
router.use('/api', apiRoutesParent);
router.use('/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  router.use(express.static('client/build'));
  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  router.use(express.static(__dirname + 'client/public'));
  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });
}
module.exports = router;
