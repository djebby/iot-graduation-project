import express from "express";
import { createPackage } from "../controllers/package-controllers";

const router = express.Router();




//-----------------------------------------------POST => /api/ajouter
router.post("/ajouter", createPackage);







export default router;