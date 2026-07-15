import express from "express";
import { requireAuth } from "../../shared/middleware/requireAuth";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  resendEmailOTp,
  verifyEmailOTp,
} from "./auth.controllers";

const router = express.Router();

router.get("/current-user", requireAuth, getCurrentUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/resend-otp", resendEmailOTp);

router.post("/verify-otp", verifyEmailOTp);

export default router;
