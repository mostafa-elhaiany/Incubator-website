// Entity model and validator
const Model = require('../models/Schedule')
const validator = require('../validations/scheduleValidations')
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
exports.withType= async (req,res)=>{
  const type = req.params.type
  const allSchedules = await Model.find({committee:type})
  return res.json({
    status:'success',
    data:allSchedules
  })
}
