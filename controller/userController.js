const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const JWT = require("jsonwebtoken");

const Student = require("../models/studentSchema");
const Teacher = require("../models/teacherSchema");
const Admin = require("../models/adminSchema");
const users = require("../models/UsersModel");
const Classroom = require("../models/Classrooms")
const Grade = require("../models/Grades")


const registeruser = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      school,
      role,
      contactNumber,
      email,
      nationality,
      identificationNumber,
      pgname,
      pgcontactNumber,
      pgemail,
      pgstreet,
      schoolName,
      pgcity,
      pgstate,
      pgzip,
      pgrelationship,
      previousSchool,
      accountusername,
      accountpassword,
      city,
      state,
      zip,
      street
    } = req.body;

    // Validation for mandatory fields
    if (
      !role ||
      !street ||
      !zip ||
      !city ||
      !state ||
      !schoolName ||
      !accountusername ||
      !accountpassword ||
      !email ||
      !fullName ||
      !dateOfBirth ||
      !gender ||
      !contactNumber ||
      !nationality ||
      !identificationNumber ||
      !previousSchool
    ) {
      res.status(400).send("All fields are mandatory!");
      return;
    }

    // Check if user already exists
    const userExists = await users.findOne({ email });
    if (userExists) {
      res.status(400).send("User already registered");
      return;
    }

    // Hash password function
    const hashedPassword = await hashPassword(accountpassword);

    // Create user document
    const user = await users.create({
      fullName,
      dateOfBirth,
      gender,
      role,
      schoolName,
      address: {
        city,
        state,
        zip,
        street
      },
      contactNumber,
      email,
      nationality,
      identificationNumber,
      parentGuardian: {
        name: pgname,
        relationship: pgrelationship,
        email: pgemail,
        contactNumber: pgcontactNumber,
        address: {
          street: pgstreet,
          city: pgcity,
          state: pgstate,
          zip: pgzip
        }
      },
      school,
      previousSchool,
      account: {
        username: accountusername,
        password: hashedPassword
      }
    });

    // Role-specific logic
    let createdItem;
    if (role === "student") {
      const student = await Student.create({
        ...req.body,
        school: req.body.adminID,
        userId: user._id
      });
      await student.save();
      createdItem = student;
    } else if (role === "teacher") {
      const teacher = await Teacher.create({
        ...req.body,
        school: req.body.adminID
      });
      createdItem = await teacher.save();
    } else if (role === "admin") {
      const admin = await Admin.create({
        ...req.body
      });
      await admin.save();
      createdItem = admin;
    }

    console.log(`User created: ${user}`);
    res.status(201).json({ id: user._id, email: user.email, createdItem });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Function to hash password using bcrypt
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Password hashed");
  return hashedPassword;
};

const loginuser = asynchandler(async (req, res) => {
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
          username,
          email: user.email,
          role: user.role,
          adminID: user._id
        },
      },
      process.env.ACCESS_TOKEN_SECRET,

    );

    const userToSend = {
      username,
      role: user.role,
      adminID: user._id
    }

    res.status(200).json({ accessToken, user: userToSend });
  } else {
    res.status(401);
  }
  res.json({ message: "login user" });

});

const currentuser = asynchandler(async (req, res) => {
  res.json(req.user);
});



const getAllUsers = asynchandler(async (req, res) => {
  const user = await users.find({});


  // Send users in response
  res.json(user);

});

const countUser = asynchandler(async (req, res) => {
  try {
    const count = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    const admincount = await Admin.countDocuments();
    const totalcount = await users.countDocuments();
    res.json({ student: count, teacher: teacherCount, admin: admincount, count: totalcount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
})


module.exports = { registeruser, loginuser, currentuser, countUser, getAllUsers };
