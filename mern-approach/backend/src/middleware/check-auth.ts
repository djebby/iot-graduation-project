import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.method === 'OPTIONS') return next();

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    // in case of token is null or token = '' (a string but empty)
    if(token == null || (typeof token === 'string' && token.length === 0))
        return res.status(401).json({message: "please send request with a token", token});
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as  {name: string, role: string, iat: number, exp: number } ;
        if(decoded.role !== 'admin') return next(new Error('your are not authorized !'));
        next();
    } catch (error) {
        return next(new Error('your are not authorized !'));
    }
}

export const superAdminAuth: RequestHandler = (req, res, next) => {

}

export const rfidReaderAuth: RequestHandler = (req, res, next) => {

}