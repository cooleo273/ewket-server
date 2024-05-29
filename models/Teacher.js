const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }],
    previousSchool: { type: String },
}, {
    timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
