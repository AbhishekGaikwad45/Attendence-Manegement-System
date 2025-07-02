const express = require('express');
const router = express.Router();
const {  loginTeacher,registerTeacher } = require('../controllers/auth');

router.post('/login', loginTeacher);
router.post('/register',registerTeacher)

module.exports = router;
