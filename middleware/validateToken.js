const asyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");
const Users = require("../models/UsersModel");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
});

module.exports = validateToken;
