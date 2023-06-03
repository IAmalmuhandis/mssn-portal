const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  regno: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
