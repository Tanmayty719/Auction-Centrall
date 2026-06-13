import express from "express";
import { checkAdmin } from "../middleware/checkAdmin.js";

import {
  getAdminDashboard,
  getAllUsers,
  deleteUser,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get(
  "/dashboard",
  checkAdmin,
  getAdminDashboard
);

adminRouter.get(
  "/users",
  checkAdmin,
  getAllUsers
);

adminRouter.delete(
  "/users/:id",
  checkAdmin,
  deleteUser
);

export default adminRouter;