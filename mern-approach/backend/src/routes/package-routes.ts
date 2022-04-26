import express from "express";
import { createPackage, getPackageMovementHistory } from "../controllers/package-controllers";

const router = express.Router();


//-----------------------------------------------GET => /api/:rfid
router.get("/:rfid", getPackageMovementHistory);

//-----------------------------------------------POST => /api/ajouter
router.post("/ajouter", createPackage);







export default router;