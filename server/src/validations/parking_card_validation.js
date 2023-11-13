const { Joi } = require('express-validation');

const createRoomValidation = {
    body: Joi.object({
        _id: Joi.string(),
        roomName: Joi.string().required(),
        listDevices: Joi.array(),
        userId: Joi.string().required(),
    })
};

module.exports = createRoomValidation;
