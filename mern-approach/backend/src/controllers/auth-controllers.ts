import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/admin-model";

//----------------------------------------------------------------------------------------------POST => /api/auth/signup
export const createAdmin: RequestHandler = async (req, res, next) => {
  const { name, password } = req.body;
  if (password.length < 5)
    return next(new Error("password should have at least 5 characters!"));
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = await new Admin({ name, password: hashedPassword }).save();
    res.status(201).json({
      message: "admin added successfully",
      adminName: newAdmin.name,
      adminPassword: password,
    });
  } catch (error: any) {
    return next(new Error(error.message));
  }
};

//----------------------------------------------------------------------------------------------POST => /api/auth/login
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
    let role =
      existingAdmin.name === "super.admin.00" ? "super-admin" : "admin";
    const token = jwt.sign(
      { name: existingAdmin.name, role },
      process.env.JWT_SECRET_KEY!.toString(),
      { expiresIn: "8h" }
    );
    res
      .status(200)
      .json({
        message: "admin connect successfully",
        role,
        token,
        expirationTime: new Date(
          new Date().getTime() + 1000 * 60 * 60 * 8
        ).getTime(),
      });
  } catch (error: any) {
    return next(new Error(error.message));
  }
};
