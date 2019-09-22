const Joi = require('joi')

module.exports = {
  createValidation: req => {
    const createSchema = {
      fullName: Joi.string().min(3).max(80).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      comittee: Joi.string().required()
    }
    return Joi.validate(req, createSchema)
  },

  updateValidation: req => {
    const updateSchema = {
      fullName: Joi.string().min(3).max(80),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      comittee: Joi.string()
    }
    return Joi.validate(req, updateSchema)
  }
}
