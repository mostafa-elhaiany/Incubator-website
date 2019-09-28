// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/applicantController')
const auth = require('../../middleware/auth')
// Read all Applicant (Default route)
router.get('/', controller.default)

//private get Applicant
router.get('/user', auth,controller.user)

// Create a new Applicant
router.post('/', controller.create)

// Reads a specific Applicant given id in URL
router.get('/:id', controller.read)

// Update an existing Applicant given id in URL
router.put('/:id', controller.update)

// Delete a specific Applicant given ID in URL
router.delete('/:id', controller.delete)

//register applicant
router.post('/register', controller.register)

//authenticate Applicant
router.post('/auth',controller.auth)



module.exports = router
