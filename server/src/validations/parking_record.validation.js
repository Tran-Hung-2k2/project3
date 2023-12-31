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
        body: Joi.object({
            Name: Joi.string(),
            Address: Joi.string(),
            Max_Space: Joi.number().integer().min(0),
            Number_Of_Vehicles: Joi.number().integer().min(0),
        })
            .unknown(false)
            .custom(cv.confirmPassword)
            .prefs({ messages }),
    }),
};

export default validation;
