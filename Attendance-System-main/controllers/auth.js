const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// Register Teacher
exports.registerTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTeacher = new Teacher({ name, email, password: hashedPassword });
    await newTeacher.save();

    const token = jwt.sign({ id: newTeacher._id }, jwtSecret, { expiresIn: '1h' });
    res.status(201).json({ message: 'Registered successfully', token });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error', err });
  }
};

// Login Teacher
exports.loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt with email:', email);

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      console.log('No teacher found with this email');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await teacher.comparePassword(password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: teacher._id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', err });
  }
};

