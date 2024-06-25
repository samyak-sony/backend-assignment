import  {Request,Response} from "express";
import { check, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

import { User } from "../models/user.models";

//get users
async function getUser(req:Request,res:Response) {
    try{
        const users = await User.find({isDeleted: false});
        res.json(users);
    }catch(err:any) {
        res.status(400).json({message: err.message});
    }
}


// get user by ID
async function getUserID(req:Request,res:Response) {
    const {userId} = req.params;

    try{
        const user = await User.findById(userId);
        if(!user||user.isDeleted) {
            return res.status(400).json({message: 'User not found'});
        }
        res.json(user);
    }catch(err) {
        res.status(500).json({message:'error'});
    }
}


//Create User
async function createUser(req:Request,res:Response) {

    const {_id,email,city,name,zipCode,age} = req.body;

    await check('email')
        .isEmail()
        .withMessage('Invalid email format')
        .run(req);

    await check('zipCode')
        .isLength({min:5, max:5})
        .isNumeric()
        .withMessage('Invalid zipCode: must be 5 digit')
        .run(req);

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({message:'Validation errors',errors:errors.array()});
    }


    const existingUser = await User.findOne({email});

    if(existingUser) {
        console.log('Email in use');
        return res.send({});
    }

    try{
        const user = User.build({
            _id,
            email,
            name,
            city,
            zipCode,
            age,
        });
        await user.save();

        //generate JWT
        const userJwt = jwt.sign({
            _id:user._id,
            email:user.email,
            name:user.name
        },`${process.env.JWT_KEY}`);
        // store it on the session object
        req.session = {
            jwt: userJwt
        }

        res.status(201).send(user);
    }catch(err){
        res.status(400).json({ message: 'error' });
    }
}

//Update User user (PUT: full replacement, PATCH: partial update)

async function updateUser(req:Request,res:Response) {
    const {userId} = req.params;

    try{
        const updatedUser = await User.findByIdAndUpdate(userId,req.body,{new:true});
        if(!updatedUser || updatedUser.isDeleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send(updatedUser);
    }catch(err) {
        res.status(400).json({ message: 'error' });
    }
}
async function patchUser(req:Request,res:Response) {
    const {userId} = req.params;

    try{
        const updatedUser = await User.findByIdAndUpdate(userId,req.body,{new:true});
        if(!updatedUser || updatedUser.isDeleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send(updatedUser);
    }catch(err) {
        res.status(400).json({ message: 'error' });
    }
}

//delete User
async function deleteUser(req:Request,res:Response) {
    const {userId} = req.params;

    try{
        //for soft delete update isDeleted to true
        const deletedUser = await User.deleteOne({_id:userId});
        if(deletedUser.deletedCount === 0) {
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({message:'User permanently deleted'});
    }catch(err) {
        res.status(500).json({ message: 'Internal server error' }); // Generic error for unexpected issues
    }
}






export {
    getUser,
    getUserID,
    createUser,
    updateUser,
    patchUser,
    deleteUser};