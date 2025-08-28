const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  await User.create({
    name: name,
    email: email,
    password: password
  })
  res.json({
    message: "You are signed up!,You can login now"
  })
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "1YIrX/5hYVA3JRXMdrmtMsI/c+DrU9ifeT0Mt5Wh2kc",
        { expiresIn: "30d" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      });
    } else {
      res.status(403).json({ message: "Incorrect credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
module.exports = { registerUser, loginUser };