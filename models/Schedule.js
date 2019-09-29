const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  interviewer: {
    type: String,
    required: true
  },
  interviewee:{
    type:String,
    required:false
  },
  committee:{
      type: String,
      required:true
  },
  reserved: {
      type: Boolean,
      required:false,
      default:false
  }
})

module.exports = mongoose.model('Schedule', ScheduleSchema, 'schedule')
