import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

const regRoute = router.route("/register");
const loginRoute = router.route("/login");

regRoute.get((_req, res) => {
  res.render("pages/register", {
    info: null,
    warn: null,
    error: null,
  });
});

loginRoute.get((_req, res) => {
  res.render("pages/login", {
    info: null,
    warn: null,
    error: null,
  });
});

regRoute.post(register);

loginRoute.post(login);

export default router;
