const mongoose = require('mongoose');
const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    score: Number
});


const Grades = mongoose.model('Grade', gradeSchema);
module.exports = Grades;