import express from "express";

import { createAdmin, adminLogin, deleteAdmin } from "../controllers/auth-controllers";
import { superAdminAuth } from "../middleware/check-auth";

const router = express.Router();

//-----------------------------------------------POST => /api/auth/login
router.post("/login", adminLogin);

//-----------------------------------------------POST => /api/auth/signup
// only the single main admin of the system (super.admin.00) is allowed to create other normal admins
router.post("/signup", superAdminAuth, createAdmin);

//-----------------------------------------------DELETE => /api/auth/:adminName
// only the single main admin of the system (super.admin.00) is allowed to delete other normal admins
router.delete("/:adminName", superAdminAuth, deleteAdmin);


export default router;