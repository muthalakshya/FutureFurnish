import express from 'express';
import { loginUser, registerUser, adminLogin, userProfile } from '../controllers/userControler.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/user-profile', userProfile)

export default userRouter;