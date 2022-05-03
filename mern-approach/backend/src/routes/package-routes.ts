import express from "express";
import { createPackage, getPackageMovementHistory, pushPackageMovement, deletePackage } from "../controllers/package-controllers";
import checkAuth from "../middleware/check-auth";

const router = express.Router();


//-----------------------------------------------GET => /api/:rfid (no authorization required)
router.get("/:rfid", getPackageMovementHistory);

//-----------------------------------------------POST => /api/ajouter (require normal admin authorization)
router.post("/ajouter", checkAuth(process.env.JWT_NORMAL_ADMIN_SECRET_KEY! as string), createPackage);

//-----------------------------------------------DELETE => /api/package/:rfid (require normal admin authorization)
router.delete("/package/:rfid", checkAuth(process.env.JWT_NORMAL_ADMIN_SECRET_KEY! as string), deletePackage);

//-----------------------------------------------POST => /api/ajouter_movement/:rfid (require rfid reader authorization)
router.post("/ajouter_movement/:rfid", checkAuth(<string> process.env.JWT_RFID_READER_SECRET_KEY), pushPackageMovement);





export default router;