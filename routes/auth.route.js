const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const router = Router();

router.post(
  "/register",
  [
    check("email", "incorrect email").isEmail(),
    check("password", "incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "incorrect data during registration",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email: email });

      if (candidate) {
        return res.status(400).json({ message: "User already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "user has been registered" });
    } catch (e) {
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "enter correct email").normalizeEmail().isEmail(),
    check("password", "enter correct password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "incorrect data during login ",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "user is not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "incorrect password " });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get("jwtSecret"),
        { expiresIn: "1h" }
      );

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

module.exports = router;
