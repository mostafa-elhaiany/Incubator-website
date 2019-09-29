const Joi = require('joi')

module.exports = {
  createValidation: req => {
    const createSchema = {
      day: Joi.string().required(),
      slot: Joi.string().required(),
      interviewer: Joi.string().required(),
      interviewee: Joi.string(),
      committee: Joi.string().required(),
      reserved: Joi.bool()    }
    return Joi.validate(req, createSchema)
  },



  updateValidation: req => {
    const updateSchema = {
        day: Joi.string(),
        slot: Joi.string(),
        interviewer: Joi.string(),
        interviewee: Joi.string(),
        committee: Joi.string(),
        reserved: Joi.bool()
    }
    return Joi.validate(req, updateSchema)
  }
}
