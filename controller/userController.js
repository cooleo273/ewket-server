const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const JWT = require("jsonwebtoken");

const Student = require("../models/studentSchema");
const Teacher = require("../models/teacherSchema");
const Admin = require("../models/adminSchema");
const users = require("../models/UsersModel");
const Classroom = require("../models/Classrooms")
const Grade = require("../models/Grades")
//Adesc Register user
//@route Post /api/users/register
//@acess public

const registeruser = asynchandler(async (req, res) => {
  const {
    fullName,
    dateOfBirth,
    gender,
    role,
    schoolName,
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
    !role ||
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
  const userAvailable = await users.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already registered");
  }
  //Hash password

  try {
    const hashedPassword = await bcrypt.hash(account.password, 10);
    console.log("Password hashed");

    const user = await users.create({
      fullName,
      dateOfBirth,
      gender,
      role,
      schoolName,
      address,
      contactNumber,
      email,
      nationality,
      identificationNumber,
      parentGuardian,
      previousSchool,
      account: {
        username: account.username,
        password: hashedPassword,
      },
    });

    console.log(`user created: ${user}`);
    res.status(201).json({ id: user._id, email: user.email });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }

  if (role === "student") {
    const student =  Student.create({
      ...req.body,
      school: req.body.adminID,
      
  });

  let result = await student.save();

  
  res.send(result);
  }
  if (role === "teacher") {
    const teacher =  Teacher.create({
      ...req.body,
      school: req.body.adminID,
      
  });

  let result = await teacher.save();

  
  res.send(result);
  }
  if (role === "admin") {
    const {
      fullName,
      email,  
      schoolName,
      account
      
      
    } = req.body;
    const admin = Admin.create({
      fullName,
      email,
      schoolName,
      account:{
        username:account.username
      }
      

    });

    await admin.save();
  }

  
});

//Adesc Register user
//@route Post /api/users/register
//@acess public

const   loginuser = asynchandler(async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await users.findOne({ "account.username": username });

  if (user && (await bcrypt.compare(password, user.account.password))) {
    const accessToken = JWT.sign(
      {
        user: {
          username: user.account.username,
          email: user.email,
          role:user.role,
          adminID: user._id
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      
    );

    const userToSend = {
      username: user.account.username,
      role: user.role,
      adminID: user._id
    }

    res.status(200).json({ accessToken, user: userToSend });
  } else {
    res.status(401);
  }
  res.json({ message: "login user" });
 
});
//Adesc Current user
//@route Post /api/users/current
//@acess private

const currentuser = asynchandler(async (req, res) => {
  res.json(req.user);
});



const getAllUsers = asynchandler(async (req, res) => {  
  const user = await users.find({});
 

  // Send users in response
  res.json(user);

});

const countUser = asynchandler(async(req,res)=>{
  try {
    const count = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    const admincount = await Admin.countDocuments();
    const totalcount = await users.countDocuments();
    res.json({ student: count, teacher: teacherCount, admin : admincount, count: totalcount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
})


module.exports = { registeruser, loginuser, currentuser, countUser, getAllUsers };
