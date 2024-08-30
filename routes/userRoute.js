import express from 'express';
import userAuth from '../middleware/authMiddlewaare.js';
import { updateUserController } from '../controllers/updateUser.js';

const userRouter = express.Router();

userRouter.put('/updateuser' , userAuth , updateUserController );

export default userRouter;