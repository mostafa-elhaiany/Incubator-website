// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/highBoardController')

// Read all Highboard (Default route)
router.get('/', controller.default)

// Create a new HighBoard
router.post('/', controller.create)

// Reads a specific HighBoard given id in URL
router.get('/:id', controller.read)

// Update an existing HighBoard given id in URL
router.put('/:id', controller.update)

// Delete a specific HighBoard given ID in URL
router.delete('/:id', controller.delete)

module.exports = router
