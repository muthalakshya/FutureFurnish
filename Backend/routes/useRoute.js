import express from 'express';
import { loginUser, registerUser, adminLogin, userProfile, getUsersByType } from '../controllers/userControler.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/user-profile', userProfile)
userRouter.post('/get-user', getUsersByType)

export default userRouter;