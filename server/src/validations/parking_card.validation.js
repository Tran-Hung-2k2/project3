import { Joi } from 'express-validation';
import messages from '../utils/validation_message';
import cv from './custom.validation';

const validation = {
    // [POST] api/parking_card/
    add_parking_card: () => ({
        body: Joi.object({
            Email: Joi.string().email().required(),
        })
            .unknown(false)
            .prefs({ messages }),
    }),

    // [PATCH] api/parking_card/:id
    update_parking_card: () => ({
        body: Joi.object({
            Is_Lock: Joi.boolean().required().label('Trạng thái thẻ'),
        })
            .unknown(false)
            .prefs({ messages }),
    }),
};

export default validation;
