import express from "express";
import { createPackage, getPackageMovementHistory, pushPackageMovement } from "../controllers/package-controllers";

const router = express.Router();


//-----------------------------------------------GET => /api/:rfid
router.get("/:rfid", getPackageMovementHistory);

//-----------------------------------------------POST => /api/ajouter
router.post("/ajouter", createPackage);



//-----------------------------------------------POST => /api/ajouter_movement/:rfid (this endpoint will be used by the esp8266)
router.post("/ajouter_movement/:rfid", pushPackageMovement);



export default router;