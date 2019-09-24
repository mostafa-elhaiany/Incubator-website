const Joi = require('joi')

module.exports = {
  createValidation: req => {
    const createSchema = {
      day: Joi.string().required(),
      slot: Joi.string().required(),
      interviewer: Joi.string().required(),
      interviewee: Joi.string(),
      committee: Joi.string().required(),
      reserved: Joi.bool().required()
    }
    return Joi.validate(req, createSchema)
  },



  updateValidation: req => {
    const updateSchema = {
        day: Joi.string().required(),
        slot: Joi.string().required(),
        interviewer: Joi.string().required(),
        interviewee: Joi.string().required(),
        committee: Joi.string().required(),
        reserved: Joi.bool().required()
    }
    return Joi.validate(req, updateSchema)
  }
}
