const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    previousSchool: { type: String },
    
}, {
    timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
