import express from "express";

import { createAdmin, adminLogin, createRfidToken, deleteAdmin } from "../controllers/auth-controllers";
import checkAuth from "../middleware/check-auth";

const router = express.Router();

//-----------------------------------------------POST => /api/auth/login (no authorization required)
router.post("/login", adminLogin);

//-----------------------------------------------POST => /api/auth/signup (require super admin authorization)
// only the single main admin of the system (super.admin.00) is allowed to create other normal admins
router.post("/signup", checkAuth(<string> process.env.JWT_SUPER_ADMIN_SECRET_KEY), createAdmin);

//-----------------------------------------------POST => /api/auth/create-rfid-token (require super admin authorization)
// only the single main admin of the system (super.admin.00) is allowed to create the tokens that will be used by the rfid readers
router.post("/create-rfid-token", checkAuth(<string> process.env.JWT_SUPER_ADMIN_SECRET_KEY), createRfidToken);

//-----------------------------------------------DELETE => /api/auth/:adminName (require super admin authorization)
// only the single main admin of the system (super.admin.00) is allowed to delete other normal admins
router.delete("/:adminName", checkAuth(<string> process.env.JWT_SUPER_ADMIN_SECRET_KEY), deleteAdmin);


export default router;