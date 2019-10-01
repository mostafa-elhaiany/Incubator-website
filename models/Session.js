const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Session = new Schema({
  day: {
    type: String,
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  place: {
    type:String,
    required:true
  },
  committee:{
      type: String,
      required:true
  },
 content: {
      type: String,
      required:false
  },
  contentDescription:{
      type:String,
      required:false
  }
})

module.exports = mongoose.model('Session', Session, 'session')
