const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HighBoardSchema = new Schema({
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
  title:{
      type: String,
      required:true
  },
  committee:{
    type:String
  }
})

module.exports = mongoose.model('HighBoard', HighBoardSchema, 'highboard')
