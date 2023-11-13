import { Joi } from 'express-validation';

const auth_validation = {
    // [POST] /api/auth/register/
    register: () => ({
        body: Joi.object({
            User_Name: Joi.string().required(),
            Email: Joi.string().email().required(),
            User_Password: Joi.string().required(),
            Gender: Joi.string().valid('Nam', 'Nữ', 'Khác'),
            Birthday: Joi.date(),
            Phone_Number: Joi.string(),
            Address: Joi.string(),
        }).unknown(true),
    }),

    // [POST] /api/auth/login/
    login: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
            User_Password: Joi.string().required(),
        }),
    }),

    // [POST] /api/auth/change_password/
    change_password: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
            Old_Password: Joi.string().required(),
            New_Password: Joi.string().required(),
            Confirm_Password: Joi.string().required(),
        }),
    }),

    // [POST] /api/auth/forget_password/
    forget_password: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
        }),
    }),

    // [POST] /api/auth/refresh_token/
    refresh_token: () => ({
        cookies: Joi.object({
            refresh_token: Joi.string().required(),
        }).unknown(true),
    }),
};

export default auth_validation;
