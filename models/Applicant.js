const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplicantSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  reservation: {
      day:{
          type:String,
          required:true
      },
      slot:{
          type:String,
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
  hobbies:{
    type:String,
    required:true
  },
  experience:{
    type:String,
    required:true
  },
  GUC_ID: {
    type: String,
    required:true
  },
  rejected:{
    type:Boolean
  },
  feedBack:{
    type:String
  }
})

module.exports = mongoose.model('Applicant', ApplicantSchema, 'applicant')
