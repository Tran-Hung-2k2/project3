import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [POST] api/parking/
    add_parking: () => ({
        body: Joi.object({
            Name: Joi.string().required(),
            Address: Joi.string(),
            Max_Space: Joi.number().integer().min(0),
        })
            .unknown(false)
            .custom(cv.confirmPassword)
            .prefs({ messages }),
    }),

    // [PATCH] api/parking/:id
    update_parking: () => ({
        params: Joi.object({
            id: Joi.string().required().custom(cv.uuidv4Id),
        }).unknown(false),
        body: Joi.object({
            Name: Joi.string().label('Tên bãi đỗ xe'),
            Address: Joi.string().label('Địa chỉ'),
            Max_Space: Joi.number().integer().min(0).label('Chỗ trống tối đa'),
            Number_Of_Vehicles: Joi.number().integer().min(0).label('Số lượng xe trong bãi'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
