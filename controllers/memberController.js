// Entity model and validator
const Model = require('../models/Member')
const validator = require('../validations/memberValidations')
const authValidator = require('../validations/authValidations')
const main = require('./main')

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

exports.changePassword = async (req,res)=>{
  const id = req.params.id
  const valid = authValidator.ChangePasswordValidation(req.body)
  if (valid.error) {
    return res.status(400).json({
      status: 'Error',
      message: valid.error.details[0].message
    })
  }
  const user = Model.findById(id)
  bcrypt.genSalt(10, (err,salt)=>{
    if(err) throw err
    bcrypt.hash(user.password,salt,(err,hash)=>{
      if(err) throw err
      user.password=hash
      user.save()
      .then(user=>{
          jwt.sign(
            {id:user._id,type:'member'},
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
