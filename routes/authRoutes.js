const { Router } = require("express");
const User = require("../models/User");
const authRouter = Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

//  endpoint: api/auth/registration
authRouter.post(
  "/registration",
  //validate and sanitize input
  [
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 6 }).trim().escape(),
  ],
  async (req, res, next) => {
    // Finds the validation errors in the request and wraps them in an object with handy functions

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Provided credentials are not correct",
        errors: errors.array(),
      });
    }
    try {
      const { email, password } = req.body;
      const userFound = await User.findOne({ email });
      if (userFound) {
        return res
          .status(400)
          .json({ message: "Email has already been registred" });
      }

      const passwordHash = await hashPassword(password, 7);
      const user = new User({ email, password: passwordHash });
      await user.save();
      res.status(201).json({ message: "User is created" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//  endpoint: api/auth/login
authRouter.post(
  "/login",
  // validate and sanitaize input
  check("email").isEmail().normalizeEmail(),
  check("password").trim().escape(),
  async (req, res, next) => {
    // Finds the validation errors in the request and wraps them in an object with handy functions

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Provided credentials are not correct",
        errors: errors.array(),
      });
    }
    try {
      const { email, password } = req.body;
      // check if email exists
      const userFound = await User.findOne({ email });
      if (!userFound) {
        return res.status(404).json({ message: "User is not found" });
      }

      //verify password
      const matchFound = await bcrypt.compare(password, userFound.password);
      if (!matchFound) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        { userId: userFound.id },
        config.get("jwtSecret"),
        { expiresIn: "1h" }
      );

      res.status(200).json({ token, userId: userFound.id });
    } catch (error) {}
  }
);


//HELPER FUNCTIONS
// Hash password
const hashPassword = async (password, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

// Finds the validation errors in the request and wraps them in an object with handy functions

module.exports = {authRouter};
