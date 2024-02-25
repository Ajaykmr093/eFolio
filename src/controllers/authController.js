import User from "../models/User.js";
import { compare } from "bcrypt";

export async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    const user = new User({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: password,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { name, password } = req.body;

    const user = await User.findOne().or([
      { username: name.toLowerCase() },
      { email: name.toLowerCase() },
    ]);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.userId = user._id;
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getUserById(id) {
  const user = await User.findOne({ _id: id });
  return user;
}
