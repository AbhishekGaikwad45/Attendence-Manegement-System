const Student = require('../models/Student');
const attendance = require('../models/Attendance');

// Get students by class
exports.getStudentsByClass = async (req, res) => {
  const { className } = req.params;

  try {
    // Find students in the specified class
    const students = await Student.find({ class: className });

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found in this class' });
     
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error });
  }
};

exports.registerStudent = async (req, res) => {
  try {
    const { name, rollNumber, className } = req.body;

    const student = new Student({ name, rollNumber, className });
    await student.save();

    res.status(201).json({ message: 'Student registered', student });
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(500).json({ message: 'Failed to register student', error });
  }
};
