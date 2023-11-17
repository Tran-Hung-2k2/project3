import { Joi } from 'express-validation';

const auth_validation = {
    // [POST] api/parking/
    add_parking: () => ({
        body: Joi.object({
            Parking_Name: Joi.string().required(),
            Address: Joi.string(),
            Max_Space: Joi.number().integer().min(0),
        }),
    }),

    // [PATCH] api/parking/:id
    update_parking: () => ({
        body: Joi.object({
            Parking_Name: Joi.string(),
            Address: Joi.string(),
            Max_Space: Joi.number().integer().min(0),
            Number_Of_Vehicles: Joi.number().integer().min(0),
        }),
    }),
};

export default auth_validation;
