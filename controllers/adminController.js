// Entity model and validator
const Model = require('../models/Admin')
const validator = require('../validations/adminValidations')
const main = require('./main')
const helperController= require('./helperController')
const highboardController= require('./highBoardController')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.default = async (req, res) => {
  await main.default(res, Model)
}

exports.create = async (req, res) => {
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
  const flag= await helperController.checkEmail(body.email)
  if(!flag){
    return res.status(400).json({
      status:"error",
      msg:'a user with that email already exists'
    })
  }
  const newAdmin = new Model(body) 
  bcrypt.genSalt(10, (err,salt)=>{
    if(err) throw err
    bcrypt.hash(newAdmin.password,salt,(err,hash)=>{
      if(err) throw err
      newAdmin.password=hash
      newAdmin.save()
      .then(admin=>{
          jwt.sign(
            {id:admin._id,type:'admin'},
            process.env.jwtSecret,
            {expiresIn:3600},
            (err,token)=>{
              if(err) throw err
             
              return res.json({
                status:'success',
                token,
                data:admin
              })
            }
          )           
      })
    })
  })
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

exports.addHighBoard= async (req,res) =>{
  return highboardController.create(req,res)
}