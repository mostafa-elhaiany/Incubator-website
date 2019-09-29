// Entity model and validator
const Model = require('../models/HighBoard')
const validator = require('../validations/highBoardValidations')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const main = require('./main')

exports.default = async (req, res) => {
  await main.default(res, Model)
}
exports.create = async (req, res) => {const body = req.body
  if(!body)
  {
    return res.status(400).json({
      status:'error',
      msg:"body can't be empty"
    })
  }
  const valid = validator.createValidation(body)
  if (valid.error) {
    return res.status(400).json({
      status: 'error',
      message: valid.error.details[0].message,
    })
  }

  Model.findOne({email:body.email})
  .then(applicant=>{
      if(applicant)
      {
        return res.status(400).json({
          status:"error",
          msg:'a user with that email already exists'
        })
      }

    const newApplicant = new Model(req.body) 
    bcrypt.genSalt(11, (err,salt)=>{
      if(err) throw err
      bcrypt.hash(newApplicant.password,salt,(err,hash)=>{
        if(err) throw err
        newApplicant.password=hash
        newApplicant.save()
        .then(applicant=>{

            jwt.sign(
              {id:applicant._id},
              process.env.jwtSecret,
              {expiresIn:3600},
              (err,token)=>{
                if(err) throw err
               
                res.json({
                  status:'success',
                  token,
                  data:applicant
                })
              }
            )           
        })
      })
    })

  })
  .catch(err=>console.log(err))

}

exports.read = async (req, res) => {
  await main.read(req, res, Model)
}

exports.update = async (req, res) => {
  await main.update(req, res, validator, Model)
}

exports.delete = async (req, res) => {
  await main.delete(req, res, Model)
}
