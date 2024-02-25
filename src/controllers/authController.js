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
    return res.status(200).render("pages/register", {
      info: "Registration successful. Please login.",
      warn: null,
      error: null,
    });
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      return res.status(409).render("pages/register", {
        info: null,
        warn: "Email/Username already exists.",
        error: null,
      });
    }
    console.error(error);
    return res.status(500).render("pages/register", {
      info: null,
      warn: null,
      error: "Internal server error",
    });
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
      return res.status(401).render("pages/login", {
        info: null,
        warn: null,
        error: "Invalid Credentials.",
      });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).render("pages/login", {
        info: null,
        warn: null,
        error: "Invalid Credentials.",
      });
    }

    req.session.userId = user._id;
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).render("pages/login", {
      info: null,
      warn: null,
      error: "Internal server error",
    });
  }
}

export async function getUserById(id) {
  const user = await User.findOne({ _id: id });
  return user;
}
