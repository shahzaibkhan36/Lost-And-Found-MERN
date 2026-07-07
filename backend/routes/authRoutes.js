import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  becomeAdmin,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.post("/become-admin", protect, becomeAdmin);

export default router;
