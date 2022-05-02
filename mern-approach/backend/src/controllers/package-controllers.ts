import { RequestHandler } from "express";
import Package from "../models/package-model";

//----------------------------------------------------------------------------------------------GET => /api/:rfid (no authorization required)
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
  
};
//----------------------------------------------------------------------------------------------POST => /api/ajouter (require normal admin authorization)
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
    const newPackage = new Package({
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
    res.status(201).json({message: `package ${rfidTag} addded successffully`});

  } catch (error: any) {
    // throw an error to the error middleware
    return next( new Error(error!.message));
  }
};

//----------------------------------------------------------------------------------------------POST => /api/ajouter_movement/:rfid (require rfid reader authorization)
export const pushPackageMovement: RequestHandler = async (req, res, next) => {
  const rfid = req.params.rfid;
  try {
    let colis = await Package.findOne({rfidTag: rfid});
    if(colis === null){
      return res.status(404).json({message: `sorry no package founded with this id ${rfid}`});
    }
    colis!.movementHistory.push({
      date: new Date().toISOString().replace("T", " ").substring(0, 19),
      pays: "Tunisia", // data from the decoded esp8266 token
      lieu: "esp8266 location", // data from the decoded esp8266 token
      type_even: "esp8266 event type", // data from the decoded esp8266 token
      autres_info: "other information from esp8266", // data from the decoded esp8266 token
    });
    await colis?.save();
    res.status(201).json({ message: `movement of package ${rfid} pushed successffully` });
  } catch (error: any) {
    // throw an error to the error middleware
    return next( new Error(error!.message));
  }
};

//----------------------------------------------------------------------------------------------DELETE => /api/package/:rfid (require normal admin authorization)
export const deletePackage: RequestHandler = async (req, res, next) => {
  const rfid = req.params.rfid;
  try {
    if(!(await Package.findOne({rfidTag: rfid}))) 
      return res.status(404).json({message: `sorry no package founded with this id ${rfid}`});
    
    const deletionResult = await Package.deleteOne({rfidTag: rfid});

    res.status(200).json({message: "package deleted successfully ", deletionResult});
  } catch (error: any) {
    return next(new Error(error!.message));
  }
};