const Joi = require('joi')

module.exports = {
  createValidation: req => {
    const createSchema = {
      name: Joi.string().min(3).max(80).required(),
      description: Joi.string().min(10).required()
    }
    return Joi.validate(req, createSchema)
  },

  updateValidation: req => {
    const updateSchema = {
        name: Joi.string().min(3).max(80),
        description: Joi.string().min(10)
      
    }
    return Joi.validate(req, updateSchema)
  }
}
