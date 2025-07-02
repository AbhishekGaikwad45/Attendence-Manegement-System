// controllers/attendanceController.js
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');


exports.markAttendance = async (req, res) => {
  const { attendanceData, date } = req.body;
  console.log("Received attendance data:", attendanceData);
  console.log("Received date:", date);

  try {
    // Loop through and insert records
    for (const studentId in attendanceData) {
      await Attendance.create({
        student: studentId,
        status: attendanceData[studentId],
        date,
      });
    }

    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({
      message: "Failed to mark attendance",
      error,
    });
  }
};




// controllers/attendanceController.js
exports.getClasswiseAttendance = async (req, res) => {
    const { className } = req.params;
  
    try {
      // Fetch students by class
      const students = await Student.find({ className });
     
      if (!students.length) {
        console.log('No students found for the given class.');
        return res.status(404).json({ message: 'No students found' });
      }
  
      // Get total number of days
     const totalDays = (await Attendance.distinct('date')).length;

      if (totalDays === 0) {
        console.log('No attendance records found.');
        return res.status(404).json({ message: 'No attendance records found' });
      }
  
      // Calculate attendance percentages
      const attendanceData = await Promise.all(students.map(async (student) => {
        const totalPresentDays = await Attendance.countDocuments({
          student: student._id,
          status: 'Present',
        });
  
        const percentage = (totalPresentDays / totalDays) * 100;
  
        return {
           _id: student._id, 
          studentName: student.name,
          rollNumber: student.rollNumber,
          percentage: percentage.toFixed(2),
        };
      }));
  
      res.status(200).json(attendanceData);
    } catch (error) {
      console.error('Failed to get class-wise attendance:', error);
      res.status(500).json({ message: 'Failed to get class-wise attendance', error });
    }
  };