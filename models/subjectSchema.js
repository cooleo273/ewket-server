const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subName: {
        type: String,
        required: true,
    },
    subCode: {
        type: String,
        required: true,
    },
    sessions: {
        type: String,
        required: true,
    },
    sclassName: { // Corrected field definition
        type: mongoose.Schema.Types.ObjectId, // Ensure it's a string
        ref: 'sclass'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    }
}, { timestamps: true });

module.exports = mongoose.model("subject", subjectSchema);