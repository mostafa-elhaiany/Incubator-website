// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/memberController')

// Read all member (Default route)
router.get('/', controller.default)

// Create a new member
router.post('/', controller.create)

// Reads a specific Member given id in URL
router.get('/:id', controller.read)

// Update an existing member given id in URL
router.put('/:id', controller.update)

// Delete a specific Member given ID in URL
router.delete('/:id', controller.delete)

module.exports = router
