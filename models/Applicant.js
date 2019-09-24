const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplicantSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  committee:{
      type: String,
      required:true
  },
  reservation: {
      day:{
          type:String,
          required:true
      },
      slot:{
          type:Number,
          required:true
      }
  },
  firstPrefrence: {
    type: String,
    required:true
  },
  secondPrefrence: {
    type: String,
    required:true
  },
  why:{
    type: String,
    required:true
  },
  id: {
    type: String,
    required:true
  }
})

module.exports = mongoose.model('Applicant', ApplicantSchema, 'applicant')
