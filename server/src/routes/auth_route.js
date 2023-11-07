import express from 'express';
import auth_controller from '../controllers/auth_controller.js';
const auth_route = express.Router();

auth_route.post('/register', auth_controller.register);
auth_route.post('/login', auth_controller.login);
auth_route.post('/logout', auth_controller.logout);
auth_route.post('/refreshToken', auth_controller.refreshToken);

export default auth_route;
