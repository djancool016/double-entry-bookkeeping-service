const router = require('express').Router()
const config = require('../config')
const {controller: {sendResponse}} = require('dwij-simple-orm').init(config)
const controller = require('../controllers/account.controller')

const sendResultResponse = (req, res, next)=> sendResponse(req, res, next, 'result')

// create
router.post('/', controller.create, sendResultResponse)

// find by params id
router.get('/:id', controller.read, sendResultResponse) 

// find by request body
router.get('/', controller.read, sendResultResponse) 

// update
router.put('/', controller.update, sendResultResponse) 

// delete by params id
router.delete('/:id', controller.destroy, sendResultResponse) 

module.exports = router