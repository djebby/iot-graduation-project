import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default (secretKey: string) =>
  (req: Request | any, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") return next();
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    // in case of token is null or token = '' (a string but empty)
    if (token == null || (typeof token === "string" && token.length === 0))
      return res
        .status(401)
        .json({ message: "please send request with a token", token });
    try {
      const decoded = jwt.verify(token, secretKey);
      req.adminData = decoded;
      next();
    } catch (error) {
      return next(new Error("your are not authorized !"));
    }
  };
