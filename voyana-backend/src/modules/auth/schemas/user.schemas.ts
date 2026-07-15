import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationTokenHash: {
      type: String,
      select: false,
    },

    emailVerificationExpiresAt: {
      type: Date,
      select: false,
    },

    passwordResetTokenHash: {
      type: String,
      select: false,
    },

    passwordResetExpiresAt: {
      type: Date,
      select: false,
    },

    passwordChangedAt: {
      type: Date,
    },

    lastLoginAt: {
      type: Date,
    },

    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lockedUntil: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    accessToken: {
      type: String,
      select: false,
    },
    accessTokenExpiresAt: {
      type: Date,
      select: false,
    },

    refreshToken: {
      type: String,
      select: false,
    },
    refreshTokenExpiresAt: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);
