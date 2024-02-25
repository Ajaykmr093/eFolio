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
    res.status(201).send(`
    <div class="info-container">
      Registeraton sucessful.
    </div>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send(`
    <div class="error-container">
      Internal server error.
    </div>
    `);
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
      return res.status(401).send(`
      <div class="warn-container">
        Invalid credentials.
      </div>
      `);
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send(`
      <div class="warn-container">
        Invalid credentials.
      </div>
      `);
    }

    req.session.userId = user._id;
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send(`
    <div class="error-container">
      Internal server error.
    </div>
    `);
  }
}

export async function getUserById(id) {
  const user = await User.findOne({ _id: id });
  return user;
}
