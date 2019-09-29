// Entity model and validator
const Model = require('../models/HighBoard')
const validator = require('../validations/highBoardValidations')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const main = require('./main')
const helperController= require('./helperController')

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
  const newHighBoard = new Model(body) 
  bcrypt.genSalt(15, (err,salt)=>{
    if(err) throw err
    bcrypt.hash(newHighBoard.password,salt,(err,hash)=>{
      if(err) throw err
      newHighBoard.password=hash
      newHighBoard.save()
      .then(highboard=>{
          jwt.sign(
            {id:highboard._id,type:'highboard'},
            process.env.jwtSecret,
            {expiresIn:3600},
            (err,token)=>{
              if(err) throw err
             
              return res.json({
                status:'success',
                token,
                data:highboard
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
