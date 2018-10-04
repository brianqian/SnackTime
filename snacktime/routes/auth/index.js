const router = require('express').Router();
const authRoutes = require('./auth');

// Book routes
router.use('/auth', authRoutes);

module.exports = router;
