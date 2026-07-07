import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Report from "../models/Report.js";

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
export const getStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalReports, lostCount, foundCount, claimedCount, adminCount] =
    await Promise.all([
      User.countDocuments(),
      Report.countDocuments(),
      Report.countDocuments({ type: "lost" }),
      Report.countDocuments({ type: "found" }),
      Report.countDocuments({ isClaimed: true }),
      User.countDocuments({ role: "admin" }),
    ]);

  res.json({
    success: true,
    stats: {
      totalUsers,
      totalReports,
      lostCount,
      foundCount,
      claimedCount,
      unclaimedCount: totalReports - claimedCount,
      adminCount,
    },
  });
});

// @desc    Get all reports (admin view, no ownership filter)
// @route   GET /api/admin/reports
export const getAllReportsAdmin = asyncHandler(async (req, res) => {
  const reports = await Report.find()
    .sort({ createdAt: -1 })
    .populate("userId", "name email role");
  res.json({ success: true, count: reports.length, reports });
});

// @desc    Delete any report regardless of owner
// @route   DELETE /api/admin/reports/:id
export const deleteAnyReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }
  await report.deleteOne();
  res.json({ success: true, message: "Report deleted" });
});

// @desc    Delete a user account (and their reports)
// @route   DELETE /api/admin/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    res.status(400);
    throw new Error("You cannot delete your own account from here");
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await Report.deleteMany({ userId: user._id });
  await user.deleteOne();

  res.json({ success: true, message: "User and their reports were deleted" });
});

// @desc    Change a user's role (promote/demote admin)
// @route   PUT /api/admin/users/:id/role
export const setUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role)) {
    res.status(400);
    throw new Error("role must be 'user' or 'admin'");
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = role;
  await user.save();

  res.json({ success: true, message: `User role updated to ${role}` });
});
