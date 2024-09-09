const router = require('express').Router()
const config = require('../config')
const {controller: {sendResponse}} = require('dwij-simple-orm').init(config)
const controller = require('../controllers/transaction.controller')

// create
router.post('/', controller.create, sendResponse)

// find by params id
router.get('/:id', controller.read, sendResponse) 

// find by request body
router.get('/', controller.read, sendResponse) 

// update
router.put('/', controller.update, sendResponse) 

// delete by params id
router.delete('/:id', controller.destroy, sendResponse) 

module.exports = router