// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/adminController')
const adminAuth = require('../../middleware/adminAuth')
// Read all Admins (Default route)
router.get('/', controller.default)

// Create a new Admin
router.post('/', controller.create)

// Reads a specific Admin given id in URL
router.get('/:id', controller.read)

// Update an existing Admin given id in URL
router.put('/:id', controller.update)

// Delete a specific Admin given ID in URL
router.delete('/:id', controller.delete)

router.post('/createHighboard',adminAuth,controller.addHighBoard)
module.exports = router
