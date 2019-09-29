// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/committeeController')

// Read all Committee (Default route)
router.get('/', controller.default)

// Create a new Committee
router.post('/', controller.create)

// Reads a specific Committee given id in URL
router.get('/:id', controller.read)

// Update an existing Committee given id in URL
router.put('/:id', controller.update)

// Delete a specific Committee given ID in URL
router.delete('/:id', controller.delete)

module.exports = router
