const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  role:{type:String, required:true, enum: ['student', 'teacher', 'admin']},
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  nationality: { type: String, required: true },
  identificationNumber: { type: String, required: true },
  parentGuardian: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true }
    }
  },
  previousSchool: { type: String },
  account: {
    username: { type: String, required: true },
    password: { type: String, required: true }
  }
});

const users = mongoose.model('users', userSchema);
module.exports = users;
