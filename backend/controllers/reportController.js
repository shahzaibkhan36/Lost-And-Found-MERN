import asyncHandler from "express-async-handler";
import Report from "../models/Report.js";
import { usingCloudinary } from "../config/cloudinary.js";

const buildImageUrl = (req, file) => {
  if (!file) return "";
  if (usingCloudinary) return file.path; // cloudinary gives full url in `path`
  return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
};

// @desc    Create a lost or found report
// @route   POST /api/reports
export const createReport = asyncHandler(async (req, res) => {
  const { type, name, item, contact, location, description, date } = req.body;

  if (!type || !["lost", "found"].includes(type)) {
    res.status(400);
    throw new Error("type must be 'lost' or 'found'");
  }
  if (!name || !item || !contact || !location || !description) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  const report = await Report.create({
    userId: req.user._id,
    type,
    name,
    item,
    contact,
    location,
    description,
    date: date ? new Date(date) : undefined,
    imageUrl: buildImageUrl(req, req.file),
  });

  res.status(201).json({ success: true, report });
});

// @desc    Get all reports (optionally filter by type / search / mine)
// @route   GET /api/reports?type=lost&search=wallet&mine=true
export const getReports = asyncHandler(async (req, res) => {
  const { type, search, mine } = req.query;
  const filter = {};

  if (type && ["lost", "found"].includes(type)) filter.type = type;
  if (mine === "true") filter.userId = req.user._id;

  if (search) {
    filter.$or = [
      { item: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  const reports = await Report.find(filter)
    .sort({ createdAt: -1 })
    .populate("userId", "name email photoURL");

  res.json({ success: true, count: reports.length, reports });
});

// @desc    Get single report
// @route   GET /api/reports/:id
export const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id).populate(
    "userId",
    "name email photoURL"
  );
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }
  res.json({ success: true, report });
});

// @desc    Update a report (owner only)
// @route   PUT /api/reports/:id
export const updateReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }
  if (
    report.userId.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to edit this report");
  }

  const fields = ["name", "item", "contact", "location", "description", "date"];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) report[f] = f === "date" ? new Date(req.body[f]) : req.body[f];
  });
  if (req.file) report.imageUrl = buildImageUrl(req, req.file);

  await report.save();
  res.json({ success: true, report });
});

// @desc    Delete a report (owner only)
// @route   DELETE /api/reports/:id
export const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }
  if (
    report.userId.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    res.status(403);
    throw new Error("Not authorized to delete this report");
  }

  await report.deleteOne();
  res.json({ success: true, message: "Report deleted" });
});

// @desc    Mark a report as claimed
// @route   PUT /api/reports/:id/claim
export const claimReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }
  if (report.isClaimed) {
    res.status(400);
    throw new Error("This item has already been claimed");
  }

  report.isClaimed = true;
  report.claimerId = req.user._id;
  report.claimedAt = new Date();
  await report.save();

  res.json({ success: true, report });
});
