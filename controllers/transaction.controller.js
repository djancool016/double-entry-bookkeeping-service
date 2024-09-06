const config = require('../config')
const {controller} = require('dwij-simple-orm').init(config)
const Model = require('../models/transaction.model')


const baseController = (method) => (req, res, next) => {
    return controller[method](req, res, next, new Model())
}

module.exports = {
    create: baseController('create'),
    read: baseController('read'),
    update: baseController('update'),
    destroy: baseController('destroy')
}