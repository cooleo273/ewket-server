const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
    parentGuardian: {
        name: { type: String, required: true },
        relationship: { type: String, required: true },
        contactNumber: { type: String, required: true },
        email: { type: String },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zip: { type: String }
        }
    },
    previousSchool: { type: String },
    grades: [{
        subject: { type: String },
        grade: { type: String },
        date: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
