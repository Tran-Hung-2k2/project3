const { Joi } = require('express-validation')

const changePasswordValidation = {
  body: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  })
}

const updateInfoValidation = {
  body: Joi.object({
    gender: Joi.string().valid('male', 'female', 'others'),
    fullName: Joi.string(),
    address: Joi.string()
  })
}

module.exports = {
  changePasswordValidation,
  updateInfoValidation
}