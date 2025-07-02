const express = require('express');
const { markAttendance ,getClasswiseAttendance} = require('../controllers/attendance');
const router = express.Router();

// Define the route for marking attendance
router.post('/mark', markAttendance);
router.get('/classwise/:className', getClasswiseAttendance);
module.exports = router;
