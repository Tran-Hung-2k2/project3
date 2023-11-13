import express from 'express';
import auth_controller from '../controllers/auth_controller.js';
import { validate } from 'express-validation';
import auth_validation from '../validations/auth_validation.js';

const auth_route = express.Router();

auth_route.post('/register', validate(auth_validation.register()), auth_controller.register);
auth_route.post('/login', validate(auth_validation.login()), auth_controller.login);
auth_route.post('/change_password', validate(auth_validation.change_password()), auth_controller.change_password);
auth_route.post('/forget_password', validate(auth_validation.forget_password()), auth_controller.forget_password);
auth_route.get('/verify_forget_password', auth_controller.verify_forget_password);
auth_route.post('/logout', auth_controller.logout);
auth_route.post('/refresh_token', validate(auth_validation.refresh_token()), auth_controller.refresh_token);

export default auth_route;
