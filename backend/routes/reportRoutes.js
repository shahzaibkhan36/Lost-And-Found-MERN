import express from "express";
import {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
  claimReport,
} from "../controllers/reportController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getReports)
  .post(protect, upload.single("image"), createReport);

router
  .route("/:id")
  .get(protect, getReportById)
  .put(protect, upload.single("image"), updateReport)
  .delete(protect, deleteReport);

router.put("/:id/claim", protect, claimReport);

export default router;
