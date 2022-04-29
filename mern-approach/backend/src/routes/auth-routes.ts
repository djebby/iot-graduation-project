import express from "express";

import { createAdmin } from "../controllers/auth-controllers";

const router = express.Router();

//-----------------------------------------------POST => /api/auth/signup
router.post("/signup", createAdmin);


export default router;