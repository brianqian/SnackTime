const router = require('express').Router();
const path = require('path');
const apiRoutesStaff = require('./api/staff.js');
const apiRoutesParent = require('./api/parent.js');
const authRoutes = require('./auth/auth.js');

router.use('/api', apiRoutesStaff);
router.use('/api', apiRoutesParent);
router.use('/auth', authRoutes);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
  console.log('serving index.html');
});

module.exports = router;
