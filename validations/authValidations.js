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
        firstPassword: Joi.string().min(8).required(),
        secondPassword: Joi.string().min(8).valid(Joi.ref('firstPassword')).required(),
        }
        return Joi.validate(req, authValidation)
    },
}
