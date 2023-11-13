import express from 'express';
import auth_controller from '../controllers/auth_controller.js';
import { validate } from 'express-validation';
import auth_validation from '../validations/auth_validation.js';

const auth_route = express.Router();

auth_route.post('/user/register', validate(auth_validation.user_register()), auth_controller.user_register);
auth_route.post('/user/login', validate(auth_validation.user_login()), auth_controller.user_login);
auth_route.post(
    '/user/forget_password',
    validate(auth_validation.user_forget_password()),
    auth_controller.user_forget_password,
);
auth_route.get('/user/verify_forget_password', auth_controller.verify_user_forget_password);
auth_route.post('/manager/login', validate(auth_validation.manager_login()), auth_controller.manager_login);
auth_route.post('/logout', auth_controller.logout);
auth_route.post('/refresh_token', validate(auth_validation.refresh_token()), auth_controller.refresh_token);

export default auth_route;
