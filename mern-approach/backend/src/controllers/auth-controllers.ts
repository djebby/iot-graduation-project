import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/admin-model";


//----------------------------------------------------------------------------------------------POST => /api/auth/login (no authorization required)
export const adminLogin: RequestHandler = async (req, res, next) => {
  const { name, password } = req.body;
  if (name.length < 5 || password.length < 5)
    return next(
      new Error(
        "names or passwords length doesn't exist with a length below 5 character"
      )
    );
  try {
    // check for the existing of the admin in the database
    const existingAdmin = await Admin.findOne({ name });
    if (!existingAdmin)
      return res
        .status(400)
        .json({ message: "please check name of admin entred !" });
    // check the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "incorrect password" });
    // generate a new token for the admin
    let role = "admin";
    let secretKey : string = process.env.JWT_NORMAL_ADMIN_SECRET_KEY as string;

    if(existingAdmin.name === "super.admin.00") {
      secretKey = process.env.JWT_SUPER_ADMIN_SECRET_KEY as string;
      role = "super-admin";
    }
    
    const token = jwt.sign(
      { name: existingAdmin.name, role, post_office: existingAdmin.post_office },
      secretKey,
      { expiresIn: "10h" }
    );
    res
      .status(200)
      .json({
        message: "admin connect successfully",
        role,
        token,
        expirationTime: new Date(
          new Date().getTime() + 1000 * 60 * 60 * 10
        ).getTime(),
      });
  } catch (error: any) {
    return next(new Error(error.message));
  }
};

//----------------------------------------------------------------------------------------------POST => /api/auth/signup (after super admin authorization)
export const createAdmin: RequestHandler = async (req, res, next) => {
  const { name, post_office, password } = req.body;
  if (password.length < 5)
    return next(new Error("password should have at least 5 characters!"));
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = await new Admin({ name, post_office, password: hashedPassword }).save();
    res.status(201).json({
      message: "admin added successfully",
      adminName: newAdmin.name,
      post_office: newAdmin.post_office,
      adminPassword: password,
    });
  } catch (error: any) {
    return next(new Error(error.message));
  }
};

//----------------------------------------------------------------------------------------------POST => /api/auth/create-rfid-token
export const createRfidToken: RequestHandler = async (req, res, next) => {
  const tokenPayload = req.body;
  try {
    const token = jwt.sign(tokenPayload, <string> process.env.JWT_RFID_READER_SECRET_KEY, {expiresIn: "90d"});
    res.status(200).json({token});
  } catch (error: any) {
    return next(new Error(error.message));
  }
};


//----------------------------------------------------------------------------------------------DELETE => /api/auth/:adminName (after super admin authorization)
export const deleteAdmin: RequestHandler = async (req, res, next) => {
  const adminName = req.params.adminName;
  try {
    if(!(await Admin.findOne({name: adminName})))
      return res.status(404).json({message: `sorry no admin founded with this name ${adminName}`});
    
    const deletionResult = await Admin.deleteOne({name: adminName});
    res.status(200).json({message: `admin ${adminName} deleted successfully`, deletionResult});

  } catch (error: any) {
    next(new Error(error.message));
  }
};