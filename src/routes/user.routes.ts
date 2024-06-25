import express from 'express';
import { getUser,
    getUserID,
    createUser,
    updateUser,
    patchUser,
    deleteUser } from './user.controller';
import { validateId } from '../middleware/validateId';    
import { authenticate } from '../middleware/authenthication';
const router = express.Router();

router.get('/worko/user',authenticate,getUser);
router.get('/worko/user/:userId',authenticate,getUserID);
router.post('/worko/user',createUser);
router.put('/worko/user/:userId',authenticate,validateId,updateUser);
router.patch('/worko/user/:userId',authenticate,validateId,patchUser);
router.delete('/worko/user/:userId',authenticate,validateId,deleteUser);


export {router as getUserRouter};