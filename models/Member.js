const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
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
  }
})

module.exports = mongoose.model('Member', MemberSchema, 'member')
