// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/authController')
const auth = require('../../middleware/auth')

//authenticate User
router.post('/user',controller.auth)

//route to change passwords for users
router.put('/changePassword/:id',auth,controller.changePassword)

//private get User
router.get('/user', auth ,controller.user)

// get user type
router.get('/userType/:id',controller.getType)

module.exports = router
