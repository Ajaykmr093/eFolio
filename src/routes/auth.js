import express from "express";
import { login, register } from "../controllers/authController";

const router = express.Router();

router.all("/login", login);
router.all("/register", register);

export default router;
