const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  internRole: String,
  duration: String,
  stipend: String,
  internStudents: [
    {
      name: String,
      rollNo: String,
      branch: String,
    },
  ],
  startDate: Date,
  endDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Internship", internshipSchema);
