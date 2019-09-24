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
        slot:Joi.number().require()
      }),
      firstPrefrence: Joi.string().required(),
      secondPrefrence: Joi.string().required(),
      why:Joi.string().min(15).required(),
      id: Joi.string().required()
      

    }
    return Joi.validate(req, createSchema)
  },

  updateValidation: req => {
    const updateSchema = {
      fullName: Joi.string().min(3).max(80),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      committee: Joi.string().required().min(10),
      firstPrefrence: Joi.string(),
      secondPrefrence: Joi.string(),
      why:Joi.string().min(15),
      id: Joi.string()
    }
    return Joi.validate(req, updateSchema)
  }
}
