const router = require('express').Router();
const path = require('path');
// const apiRoutes = require('./api');
// const authRoutes = require('./auth');

// router.use('/api', apiRoutes);
// router.use('/auth', authRoutes);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

module.exports = router;
