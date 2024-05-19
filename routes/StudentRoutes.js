const express = require ("express");
const { registerStudent, loginStudent, currentStudent } = require("../controller/studentController");
const router = express.Router();

router.post("/register", registerStudent)

router.post("/login", loginStudent)

router.get("/current", currentStudent)


module.exports = router;