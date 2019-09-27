const Joi = require('joi')

module.exports = {
  createValidation: req => {
    const createSchema = {
      name: Joi.string().min(3).max(80).required(),
      description: Joi.string().min(10).required(),
      type: Joi.string().required()
    }
    return Joi.validate(req, createSchema)
  },

  updateValidation: req => {
    const updateSchema = {
        name: Joi.string().min(3).max(80),
        description: Joi.string().min(10),
        type: Joi.string()
      
    }
    return Joi.validate(req, updateSchema)
  }
}
