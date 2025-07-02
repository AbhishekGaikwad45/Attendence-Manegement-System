// models/Student.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: String,
  rollNumber: String,
  className: String,
});

module.exports = mongoose.model('Student', studentSchema);
