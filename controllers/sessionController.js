// Entity model and validator
const Model = require('../models/Session')
const validator = require('../validations/sessionValidations')
const main = require('./main')
const committeeModel= require('../models/Committee')
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
exports.committeSessions = async (req,res) =>{
  const id = req.params.id
  committee= await committeeModel.findById(id)
  if(!committee){
    return res.status(404).json({
      status:'error',
      msg:'committe not found'
    })
  }
  sessions= await Model.find()
  committeeSessions= sessions.filter(session=>{
    return session.committee===committee.name
  })
  return res.json({
    status:'success',
    data:committeeSessions
  })
}