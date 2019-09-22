const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommitteeSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  description: {
      type:String,
      required:true
  }
})

module.exports = mongoose.model('Committee', CommitteeSchema, 'committee')
