import asyncHandler from "express-async-handler";
import crypto from "crypto";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  photoURL: user.photoURL,
  role: user.role,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt,
});

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email and password");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({ success: true, token, user: sanitizeUser(user) });
});

// @desc    Login with email & password
// @route   POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);
  res.json({ success: true, token, user: sanitizeUser(user) });
});

// @desc    Get logged-in user's profile
// @route   GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: sanitizeUser(req.user) });
});

// @desc    Update profile (name / photo)
// @route   PUT /api/auth/me
export const updateMe = asyncHandler(async (req, res) => {
  const { name, photoURL } = req.body;
  if (name) req.user.name = name;
  if (photoURL !== undefined) req.user.photoURL = photoURL;
  await req.user.save();
  res.json({ success: true, user: sanitizeUser(req.user) });
});

// @desc    Promote the logged-in user to admin using a secret code
// @route   POST /api/auth/become-admin
export const becomeAdmin = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!process.env.ADMIN_SECRET_CODE) {
    res.status(500);
    throw new Error("Admin promotion is not configured on this server");
  }

  if (!code || code !== process.env.ADMIN_SECRET_CODE) {
    res.status(401);
    throw new Error("Invalid admin code");
  }

  req.user.role = "admin";
  await req.user.save();

  res.json({ success: true, message: "You are now an admin", user: sanitizeUser(req.user) });
});
// @route   POST /api/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() });

  if (!user) {
    res.status(404);
    throw new Error("No account found with this email");
  }

  const code = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit code
  user.resetPasswordCode = code;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  // TODO: integrate a real email provider (SendGrid, SES, Nodemailer, etc.)
  // For now the code is returned so the flow is testable end-to-end.
  res.json({
    success: true,
    message: "A verification code has been sent to your email",
    devCode: process.env.NODE_ENV !== "production" ? code : undefined,
  });
});

// @desc    Verify the reset code
// @route   POST /api/auth/verify-code
export const verifyResetCode = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select(
    "+resetPasswordCode +resetPasswordExpires"
  );

  if (
    !user ||
    user.resetPasswordCode !== code ||
    !user.resetPasswordExpires ||
    user.resetPasswordExpires < Date.now()
  ) {
    res.status(400);
    throw new Error("Invalid or expired code");
  }

  res.json({ success: true, message: "Code verified" });
});

// @desc    Reset password after code verification
// @route   POST /api/auth/reset-password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select(
    "+resetPasswordCode +resetPasswordExpires"
  );

  if (
    !user ||
    user.resetPasswordCode !== code ||
    !user.resetPasswordExpires ||
    user.resetPasswordExpires < Date.now()
  ) {
    res.status(400);
    throw new Error("Invalid or expired code");
  }

  user.password = newPassword;
  user.resetPasswordCode = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ success: true, message: "Password updated successfully" });
});
