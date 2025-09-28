import express from 'express';
import { registerUser, loginUser, profile, updateProfile, changePassword } from '../controllers/user.js';
import { auth } from '../middleware/auth.js';

const routes = express.Router();

routes.post('/register', registerUser);
routes.post('/login', loginUser);
routes.get('/user', auth, profile); 
routes.put('/profile', auth, updateProfile);
routes.put('/change-password', auth, changePassword);

export default routes;