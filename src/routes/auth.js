import express from "express";

const router = express.Router();
const mockDb = {};

router.all("/login", (req, res) => {
  const { name: username, password } = req.body;

  if (mockDb[username] && mockDb[username].password === password) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.all("/register", (req, res) => {
  const { username, password } = req.body;

  if (mockDb[username]) {
    res.status(400).json({ message: "Username already exists" });
  } else {
    mockDb[username] = { password };
    res.status(201).json({ message: "Registration successful" });
  }
});

export default router;
