import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
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
        adminPassword: password
    });
  } catch (error: any) {
    return next(new Error(error.message));
  }
};