import express from "express";

import { createAdmin, adminLogin } from "../controllers/auth-controllers";

const router = express.Router();

//-----------------------------------------------POST => /api/auth/signup
router.post("/signup", createAdmin);

//-----------------------------------------------POST => /api/auth/login
router.post("/login", adminLogin);


export default router;