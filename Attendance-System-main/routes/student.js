const express = require('express');
const { getStudentsByClass,registerStudent } = require('../controllers/student');
const router = express.Router();

// Route to fetch students of a specific class
router.get('/class/:className', getStudentsByClass);

router.post('/registerStudent',registerStudent);

module.exports = router;
