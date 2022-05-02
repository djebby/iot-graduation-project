import express from "express";
import { createPackage, getPackageMovementHistory, pushPackageMovement, deletePackage } from "../controllers/package-controllers";
import { adminAuth, superAdminAuth, rfidReaderAuth } from "../middleware/check-auth";

const router = express.Router();


//-----------------------------------------------GET => /api/:rfid
router.get("/:rfid", getPackageMovementHistory);

//-----------------------------------------------POST => /api/ajouter
router.post("/ajouter", adminAuth, createPackage);

//-----------------------------------------------DELETE => /api/package/:rfid
router.delete("/package/:rfid", adminAuth, deletePackage);

//-----------------------------------------------POST => /api/ajouter_movement/:rfid (this endpoint will be used by the esp8266)
router.post("/ajouter_movement/:rfid", pushPackageMovement);





export default router;