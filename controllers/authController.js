// Entity model and validator
const applicant = require('../models/Applicant')
const highBoard = require('../models/HighBoard')
const member = require('../models/Member')
const admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const validator= require('../validations/authValidations')

exports.auth = async (req,res) =>{
  const body = req.body
  if(!body)
  {
    return res.status(400).json({
      status:'error',
      msg:"body can't be empty"
    })
  }
  const valid = validator.authValidation(body)
  if (valid.error) {
    return res.status(400).json({
      status: 'error',
      message: valid.error.details[0].message,
    })
  }


  var curr= await applicant.findOne({email:body.email})
  if(curr)
    return this.authHelper(curr,body,'Applicant')

  else{
    
     curr= await member.findOne({email:body.email})

     if(curr)
       return this.authHelper(curr,body,'Member')

    else{

      curr= await highBoard.findOne({email:body.email})

      if(curr)
        return this.authHelper(curr,body,'Highboard')

      else{
          curr= await admin.findOne({email:body.email})

          if(curr)
            return this.authHelper(curr,body,'Admin')

          else{
              return res.status(400).json({
                  status:"error",
                  msg:'user with that email does not exists'
                })        
        }
     }
    }
  }
}

exports.authHelper = async (user,body,type)=>{
  bcrypt.compare(body.password, user.password)
  .then(match=>{
    if(!match) return res.status(400).json({
          status:"error",
          msg:'wrong password'
        })
        jwt.sign(
          {id:user._id, type},
          process.env.jwtSecret,
          {expiresIn:3600},
          (err,token)=>{
            if(err) throw err
           
           return res.json({
              status:'success',
              token,
              data:user,
              type
            })
          }
          ) 
})

}

exports.user = async (req,res) =>{
var curr= await applicant.findById(req.user.id).select('-password')
  if(curr)
    return res.json({
      status:'success',
      data:curr
      })
    else{
      curr= await member.findById(req.user.id).select('-password')
      if(curr)
        return res.json({
        status:'success',
        data:curr
        })
        else{
          curr= await highBoard.findById(req.user.id).select('-password')
        if(curr)
          return res.json({
          status:'success',
          data:curr
          })
          else{
           curr= await admin.findById(req.user.id).select('-password')
          if(curr)
            return res.json({
            status:'success',
            data:curr
            })
          else{
              return res.status(400).json({
                  status:"error",
                  msg:'user with that id does not exists',
                  data:curr
                })        
        }
      }
    }
  }
}