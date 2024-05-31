const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "teacher"
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    teachSubject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
    },
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        presentCount: {
            type: String,
        },
        absentCount: {
            type: String,
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Teacher", teacherSchema)