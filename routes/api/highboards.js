// Load modules
const express = require('express')
const router = express.Router()
const controller = require('../../controllers/highBoardController')
const adminAuth = require('../../middleware/adminAuth')
const highAuth = require('../../middleware/highAuth')
// Read all Highboard (Default route)
router.get('/', adminAuth,controller.default)

// Create a new HighBoard
router.post('/', controller.create)

// Reads a specific HighBoard given id in URL
router.get('/:id', controller.read)

// Update an existing HighBoard given id in URL
router.put('/:id', controller.update)

// Delete a specific HighBoard given ID in URL
router.delete('/:id', controller.delete)

router.put('/upgrade/:id',highAuth,controller.upgradeMember)

router.put('/reject/:id',highAuth,controller.rejectApplicant)

router.put('/accept/:id',highAuth,controller.acceptApplicant)


module.exports = router
