// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/authController')
const auth = require('../../middleware/auth')

//authenticate User
router.get('/user',controller.auth)



module.exports = router
