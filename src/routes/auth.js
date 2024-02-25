import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.all("/login", login);
router.all("/register", register);

export default router;
