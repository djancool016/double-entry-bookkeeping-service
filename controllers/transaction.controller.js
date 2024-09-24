const { errorCode } = require('dwij-simple-orm/src/utils/customError')
const config = require('../config')
const {controller, customError:{endpointErrorHandler}, httpLogger:{dataLogger}} = require('dwij-simple-orm').init(config)
const Model = require('../models/transaction.model')

const baseController = (method) => (req, res, next) => {
    return controller[method](req, res, next, new Model())
}

async function getReport(req, res, next) {

    try {
        // if error happened go to next middleware
        if(req.result?.httpCode > 299) return next()

        // assign key default value
        req.body['sum'] = ['amount']
        req.body.group_by = req.body.group_by ?? ['coa_code','coa', 'dc', 'account','account_id', 'account_type']

        // run model sum to get report object
        const model = new Model()
        const result = await model.sum(req.body)

        // assign result to request
        if(result.data){
            req.result = dataLogger({httpCode: 200, data: result.data})
        }else{
            throw result
        }

        // send request result to next middleware
        return next()

    } catch (error) {
        req.result = endpointErrorHandler(error)
        return next()
    }
}
module.exports = {
    create: baseController('create'),
    read: baseController('read'),
    update: baseController('update'),
    destroy: baseController('destroy'),
    getReport
}