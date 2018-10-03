const router = require('express').Router();
const apiRoutes = require('./api');

// Book routes
router.use('/api', apiRoutes);

module.exports = router;
