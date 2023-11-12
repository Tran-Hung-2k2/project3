import express from 'express';
import auth_controller from '../controllers/auth_controller.js';
const auth_route = express.Router();

auth_route.post('/user/register', auth_controller.user_register);
auth_route.post('/user/login', auth_controller.user_login);
auth_route.post('/manager/login', auth_controller.manager_login);
auth_route.post('/logout', auth_controller.logout);
auth_route.post('/refresh_token', auth_controller.refresh_token);

export default auth_route;
