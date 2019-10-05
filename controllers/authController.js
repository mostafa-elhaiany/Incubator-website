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
    return this.authHelper(res,curr,body,'applicant')

  else{

     curr= await member.findOne({email:body.email})

     if(curr)
       return this.authHelper(res,curr,body,'member')

    else{

      curr= await highBoard.findOne({email:body.email})

      if(curr)
        return this.authHelper(res,curr,body,'highboard')

      else{
          curr= await admin.findOne({email:body.email})

          if(curr)
            return this.authHelper(res,curr,body,'admin')

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

exports.authHelper = async (res,user,body,type)=>{
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
  if(curr){

    return res.json({
      status:'success',
      data:curr,
      type:"applicant"
      })}
    else{
      curr= await member.findById(req.user.id).select('-password')
      if(curr){
        return res.json({
          status:'success',
          data:curr,
          type:member
          })}
        else{
          curr= await highBoard.findById(req.user.id).select('-password')
        if(curr){
          return res.json({
            status:'success',
            data:curr,
            type:'highboard'
            })}
          else{
           curr= await admin.findById(req.user.id).select('-password')
          if(curr){
            return res.json({
              status:'success',
              data:curr,
              type:'admin'
              })}
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

exports.getType = async (req,res) =>{
  const id = req.params.id
  try{
  var curr= await applicant.findById(id)
  if(curr)
    return res.json({
      status:'success',
      data: 'applicant'
    })

  else{

     curr= await member.findById(id)

     if(curr)
       return res.json({
        status:'success',
        data: 'member'
      })

    else{

      curr= await highBoard.findById(id)

      if(curr)
      return res.json({
        status:'success',
        data: 'highboard'
      })

      else{
          curr= await admin.findById(id)

          if(curr)
          return res.json({
            status:'success',
            data: 'admin'
          })
          else{
              return res.status(400).json({
                  status:"error",
                  msg:'user with that id does not exists'
                })        
        }
     }
    }
  }
}catch(e)
    {
      return res.status(400).json({
        status:'error',
        error:e,
        msg:'something went wrong, either an invalid id or server error. check the error above for more details'
      })
    }
}

exports.changePassword = async (req,res)=>{
  const id = req.params.id
  const valid = validator.ChangePasswordValidation(req.body)
  if (valid.error) {
    return res.status(400).json({
      status: 'Error',
      message: valid.error.details[0].message
    })
  }
var user;  
if(req.body.type==='applicant')
  user = applicant.findById(id) 
else if(req.body.type==='member')
  user = member.findById(id)
else if(req.body.type==='highboard')
  user = highBoard.findById(id)
else{
  res.status(404).json({
    status:'error',
    message:'type doesnt exist'
  })
}
  bcrypt.genSalt(10, (err,salt)=>{
    if(err) throw err
    bcrypt.hash(user.password,salt,(err,hash)=>{
      if(err) throw err
      user.password=hash
      user.save()
      .then(user=>{
          jwt.sign(
            {id:user._id,type:'applicant'},
            process.env.jwtSecret,
            {expiresIn:3600},
            (err,token)=>{
              if(err) throw err
             
              return res.json({
                status:'success',
                token,
                data:user
              })
            }
          )           
      })
    })
  })
}