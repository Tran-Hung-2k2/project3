import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';
import label from '../constants/label';

const validation = {
    // [GET] api/user/
    get_all_users: () => ({
        query: Joi.object({
            Status: Joi.string()
                .trim()
                .valid(...Object.values(label.user))
                .label('Trạng thái tài khoản'),
            Role: Joi.string()
                .valid(...Object.values(label.role))
                .label('Vai trò'),
            Name: Joi.string().trim(),
            Email: Joi.string().email(),
            User_ID: Joi.string().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/user/:id
    update_user: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
        body: Joi.object({
            Status: Joi.string()
                .valid(...Object.values(label.user))
                .label('Trạng thái tài khoản'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] /api/user/detail
    update_user_detail: () => ({
        body: Joi.object({
            Name: Joi.string().trim().label('Tên người dùng'),
            Avatar: Joi.string().label('Ảnh đại diện'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [DELETE] /api/user/:id
    delete_user: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
