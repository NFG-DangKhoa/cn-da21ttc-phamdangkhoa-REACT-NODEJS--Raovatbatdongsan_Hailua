const express = require('express');
const { getStatistics } = require('../controllers/StatisticsController');
const router = express.Router();

// Route API thống kê
router.get('/statistics', getStatistics);

module.exports = router;
