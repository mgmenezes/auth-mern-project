import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("Please fill fields, are required");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      res.status(400).json({ sucess: false, message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 12);

    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24hrs,
    });

    await user.save();
  } catch (error) {
    res.status(400).json({ sucess: false, message: error.message });
  }
  //postman
  res.send("Sign Up route");
};

export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.send("logout route");
};
