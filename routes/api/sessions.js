// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/sessionController')
const memberAuth= require('../../middleware/memberAuth')
// Read all sessions (Default route)
router.get('/', controller.default)

// Create a new sessions
router.post('/', controller.create)

// Reads a specific sessions given id in URL
router.get('/:id', memberAuth,controller.read)

// Update an existing session given id in URL
router.put('/:id', controller.update)

// Delete a specific session given ID in URL
router.delete('/:id', controller.delete)

router.get('/withCommittee/:id',controller.committeSessions)

module.exports = router
