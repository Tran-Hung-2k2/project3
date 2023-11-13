import { Joi } from 'express-validation';

const parking_card_validation = {
    // [POST] api/parking_card/
    add_parking_card: () => ({
        body: Joi.object({
            Email: Joi.string().email(),
        }),
    }),

    // [PUT] api/parking_card/:id
    update_parking_card: () => ({
        body: Joi.object({
            Is_Lock: Joi.boolean().required(),
        }),
    }),
};

export default parking_card_validation;
