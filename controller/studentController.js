const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Students = require("../models/StudentsModel");

//Adesc Register user
//@route Post /api/users/register
//@acess public

const registerStudent = asynchandler(async (req, res) => {
  const {
    fullName,
    dateOfBirth,
    gender,
    address,
    contactNumber,
    email,
    nationality,
    identificationNumber,
    parentGuardian,
    previousSchool,
    account,
  } = req.body;
  if (
    !account ||
    !email ||
    !fullName ||
    !dateOfBirth ||
    !gender ||
    !address ||
    !contactNumber ||
    !nationality ||
    !identificationNumber ||
    !parentGuardian ||
    !previousSchool 
  ) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await Students.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already registered");
  }
  //Hash password
 
  try {
    const hashedPassword = await bcrypt.hash(account.password, 10);
    console.log('Password hashed' );

    const student = await Students.create({
      fullName,
      dateOfBirth,
      gender,
      address,
      contactNumber,
      email,
      nationality,
      identificationNumber,
      parentGuardian,
      previousSchool,
      account: {
        username: account.username,
        password: hashedPassword
      }
    });

    console.log(`Student created: ${student}`);
    res.status(201).json({ id: student._id, email: student.email });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Error registering student', error });
  }
});
  
  
//Adesc Register user
//@route Post /api/users/register
//@acess public

const loginStudent = asynchandler(async (req, res) => {
  res.json({ message: "login user" });
});
//Adesc Current user
//@route Post /api/users/current
//@acess private

const currentStudent = asynchandler(async (req, res) => {
  res.json({ message: "current user information" });
});

module.exports = { registerStudent, loginStudent, currentStudent };
