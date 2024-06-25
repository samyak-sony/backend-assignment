import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const authenticate = async (req:Request,res:Response,next:NextFunction) => {
    if(!req.session?.jwt) {
        return res.status(401).json({message:'Unauthorized'});
    }

    try{
        //decode or extract information from a jwt
        const payload = jwt.verify(req.session.jwt,process.env.JWT_KEY!);
        next();
    }catch(err) {
        res.status(401).json({message:'Invalid token'});
    }
}
export {authenticate};