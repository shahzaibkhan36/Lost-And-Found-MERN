import express from "express";
import {
  getStats,
  getAllReportsAdmin,
  deleteAnyReport,
  deleteUser,
  setUserRole,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/stats", getStats);
router.get("/reports", getAllReportsAdmin);
router.delete("/reports/:id", deleteAnyReport);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/role", setUserRole);

export default router;
