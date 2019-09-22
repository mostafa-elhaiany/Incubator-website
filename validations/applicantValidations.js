const Joi = require('joi')

module.exports = {
  createValidation: req => {
    const createSchema = {
      fullName: Joi.string().min(3).max(80).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      committee: Joi.string().required().min(10),
      reservation: Joi.object().keys({
        day: Joi.string().required(),
        slot:Joi.number.require()
      })

    }
    return Joi.validate(req, createSchema)
  },

  updateValidation: req => {
    const updateSchema = {
      fullName: Joi.string().min(3).max(80),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      committee: Joi.string().required().min(10)
    }
    return Joi.validate(req, updateSchema)
  }
}
