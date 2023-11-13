import { Joi } from 'express-validation';

const auth_validation = {
    // [POST] api/parking/
    add_parking_validation: () => ({
        body: Joi.object({
            User_Name: Joi.string().required(),
            Email: Joi.string().email().required(),
            User_Password: Joi.string().required(),
            Gender: Joi.string().valid('Nam', 'Nữ', 'Khác'),
            Birthday: Joi.date(),
            Phone_Number: Joi.string(),
            Address: Joi.string(),
        }),
    }),

    // [POST] /api/auth/user/login/
    user_login_validation: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
            User_Password: Joi.string().required(),
        }),
    }),

    // [POST] /api/auth/user/forget_password/
    user_forget_password_validation: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
        }),
    }),

    // [POST] /api/auth/manager/login/
    manager_login_validation: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
            Manager_Password: Joi.string().required(),
        }),
    }),

    // [POST] /api/auth/refresh_token/
    refresh_token_validation: () => ({
        cookies: Joi.object({
            refresh_token: Joi.string().required(),
        }).unknown(true),
    }),
};

export default auth_validation;
