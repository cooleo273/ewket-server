const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    
    role: {
        type: String,
        default: "admin"
    },
    schoolName: {
        type: String,
        unique: true,
        required: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;