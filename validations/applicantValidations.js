const Joi = require('joi')

module.exports = {
  createValidation: req => {
    const createSchema = {
      fullName: Joi.string().min(3).max(80).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      reservation: Joi.object().keys({
        day: Joi.string().required(),
        slot:Joi.string().required()
      }),
      firstPrefrence: Joi.string().required(),
      secondPrefrence: Joi.string().required(),
      why:Joi.string().min(15).required(),
      experience:Joi.string().required(),
      hobbies:Joi.string().required(),
      GUC_ID: Joi.string().required(),
      rejected:Joi.bool(),
      feedBack:Joi.string()
      

    }
    return Joi.validate(req, createSchema)
  },

  updateValidation: req => {
    const updateSchema = {
      fullName: Joi.string().min(3).max(80),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      firstPrefrence: Joi.string(),
      secondPrefrence: Joi.string(),
      why:Joi.string().min(15),
      experience:Joi.string(),
      hobbies:Joi.string(),
      GUC_ID: Joi.string(),
      rejected:Joi.bool(),
      feedBack:Joi.string()
    }
    return Joi.validate(req, updateSchema)
  },

}
