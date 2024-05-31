const mongoose = require('mongoose');
const classroomSchema = new mongoose.Schema({
    name: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;