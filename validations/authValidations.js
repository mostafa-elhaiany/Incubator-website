const Joi = require('joi')

module.exports = {
    authValidation: req => {
        const authValidation = {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        GUC_ID: Joi.string()
        }
        return Joi.validate(req, authValidation)
    },
    ChangePasswordValidation: req => {
        const authValidation = {
        password: Joi.string().min(8).required(),    
        newPassword: Joi.string().min(8).required(),
        confirmPassword: Joi.string().min(8).valid(Joi.ref('newPassword')).required(),
        type: Joi.string().required()
        }
        return Joi.validate(req, authValidation)
    },
}
