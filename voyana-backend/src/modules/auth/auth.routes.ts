import express from "express";
import {
  loginUser,
  registerUser,
  resendEmailOTp,
  verifyEmailOTp,
} from "./auth.controllers";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/resend-otp", resendEmailOTp);

router.post("/verify-otp", verifyEmailOTp);

export default router;
