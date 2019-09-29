// Entity model and validator
const Model = require('../models/Applicant')
const validator = require('../validations/applicantValidations')
const authValidator=require('../validations/authValidations')
const main = require('./main')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.default = async (req, res) => {
  await main.default(res, Model)
}
exports.create = async (req, res) => {
  await main.create(req, res, validator, Model)
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

exports.register = async (req,res) =>{
  const body = req.body
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
              {id:applicant._id,type:'applicant'},
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


exports.auth = async (req,res) =>{
  const body = req.body
  if(!body)
  {
    return res.status(400).json({
      status:'error',
      msg:"body can't be empty"
    })
  }
  const valid = authValidator.authValidation(body)
  if (valid.error) {
    return res.status(400).json({
      status: 'error',
      message: valid.error.details[0].message,
    })
  }

  Model.findOne({email:body.email})
  .then(applicant=>{
      if(!applicant)
      {
        return res.status(400).json({
          status:"error",
          msg:'user with that email does not exists'
        })
      }

      //validate password
      bcrypt.compare(body.password, applicant.password)
      .then(match=>{
        if(!match) return res.status(400).json({
          status:"error",
          msg:'wrong password'
        })
        jwt.sign(
          {id:applicant._id},
          process.env.jwtSecret,
          {expiresIn:3600},
          (err,token)=>{
            if(err) throw err
           
            res.json({
              status:'success',
              token,
              data:applicant,
              type:'applicant'
            })
          }
        )  

      })
    
  })
  .catch(err=>console.log(err))

}




exports.user = async (req,res) =>{
    Model.findById(req.user.id).select('-password')
    .then(applicant=>{
      return res.json({
        status:'success',
        data:applicant
      })
    })
}

