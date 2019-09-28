// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/authController')
const auth = require('../../middleware/auth')

//authenticate User
router.post('/user',controller.auth)


//private get User
router.get('/user', auth ,controller.user)



module.exports = router