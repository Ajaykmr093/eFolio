import express from "express";
import { getUserById } from "../controllers/authController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.session.userId;
  const user = await getUserById(userId);
  if (user) delete user.password;
  res.render("pages/index", {
    user: user,
  });
});

export default router;
