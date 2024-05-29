const mongoose = require('mongoose');
const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    score: Number
});


const Grades = mongoose.model('Grade', gradeSchema);
module.exports = Grades;