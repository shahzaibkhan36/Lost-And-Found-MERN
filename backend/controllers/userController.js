import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Get all users (community directory)
// @route   GET /api/users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, users });
});

// @desc    Get single user public profile
// @route   GET /api/users/:id
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ success: true, user });
});
