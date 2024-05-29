const express = require ("express");
const { registeruser, loginuser, currentuser, countUser, getAllUsers } = require("../controller/userController");
const  validateToken  = require("../middleware/validateToken");

const router = express.Router();

router.post("/register", registeruser)

router.post("/login", loginuser)
router.get("/row-count", countUser)
router.get("/getallusers", getAllUsers)
router.get("/current",validateToken, currentuser)


module.exports = router;