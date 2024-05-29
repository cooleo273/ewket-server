const mongoose = require('mongoose');
const classroomSchema = new mongoose.Schema({
    name: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }]
});

const Classroom = mongoose.model('Classroom', classroomSchema);
module.exports = Classroom;