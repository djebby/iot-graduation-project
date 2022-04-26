import { RequestHandler } from "express";
import Package from "../models/package-model";

//-----------------------------------------------GET => /api/:rfid
export const getPackageMovementHistory: RequestHandler = async (req, res, next) => {
  const rfid = req.params.rfid;
  try {
    const packageMovement = await Package.findOne({rfidTag: rfid}, 'movementHistory');
    if(packageMovement === null){
      return res.status(404).json({message: `sorry no package founded with this id ${rfid}`});
    }
    res.status(200).json(packageMovement!.movementHistory);
  } catch (error: any) {
    // throw an error to the error middleware
    return next( new Error(error!.message));
  }
  
}

//-----------------------------------------------POST => /api/ajouter
export const createPackage: RequestHandler = async (req, res, next) => {
  const {
    rfidTag,
    poids,
    contreRembou,
    nomDest,
    rueDest,
    postDest,
    villeDest,
    gouvDest,
    paysDest,
    servDest,
    persContDest,
    telDest,
    adrDest,
    emailDest,
    nomExp,
    depExp,
    rueExp,
    villeExp,
    postExp,
    paysExp,
    telExp,
    faxExp,
    emailSocExp,
    persExp,
    telPersExp,
    faxPersExp,
    emailPersExp,
  } = req.body;

  try {
    let newPackage = new Package({
      rfidTag,
      poids,
      contreRembou,
      nomDest,
      rueDest,
      postDest,
      villeDest,
      gouvDest,
      paysDest,
      servDest,
      persContDest,
      telDest,
      adrDest,
      emailDest,
      nomExp,
      depExp,
      rueExp,
      villeExp,
      postExp,
      paysExp,
      telExp,
      faxExp,
      emailSocExp,
      persExp,
      telPersExp,
      faxPersExp,
      emailPersExp
    });
    newPackage.movementHistory.push({
      date: new Date().toISOString().replace("T", " ").substring(0, 19),
      pays: "req.adminData.pays", // data from the decoded admin token
      lieu: "req.adminData.lieu", // data from the decoded admin token
      type_even: "Recevoir les envois du client", // intial movement
      autres_info: "autres inforamtion...",
    });
    await newPackage.save();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json(req.body);
};
