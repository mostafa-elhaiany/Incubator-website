const Admin = require('../models/Admin')
const Member = require('../models/Member')
const HighBoard = require('../models/HighBoard')
const Applicant = require('../models/Applicant')


exports.checkEmail = async (email) => {
    var curr= await Admin.findOne({email})
    if(curr)
        return false;
    var curr= await HighBoard.findOne({email})
    if(curr)
        return false;
    var curr= await Member.findOne({email})
    if(curr)
        return false;
    var curr= await Applicant.findOne({email})
    if(curr)
        return false;
    return true;
 
 
        
}