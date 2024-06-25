import { Request,Response,NextFunction } from "express";
import { Types } from "mongoose";

function validateId(req:Request,res:Response,next:NextFunction) {
    const {userId} = req.params;

    if(!Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }
    next();
}
export {validateId};