import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

const loginRoute = router.route("/login");
const registerRoute = router.route("/register");

loginRoute.get((_, res) => res.render("pages/login"));
registerRoute.get((_, res) => res.render("pages/register"));

loginRoute.post(login);
registerRoute.post(register);

export default router;
