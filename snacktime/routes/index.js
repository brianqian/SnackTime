const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api/staff.js');
const authRoutes = require('./auth/auth.js');


router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

module.exports = router;
