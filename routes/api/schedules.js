// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/scheduleController')

// Read all Schedule (Default route)
router.get('/', controller.default)

// Create a new SChedule
router.post('/', controller.create)

// Reads a specific SChedule given id in URL
router.get('/:id', controller.read)

// Update an existing Schedule given id in URL
router.put('/:id', controller.update)

// Delete a specific Schedule given ID in URL
router.delete('/:id', controller.delete)

module.exports = router
