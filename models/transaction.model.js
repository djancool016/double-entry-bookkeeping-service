const config = require('../config')
const {Model, builder, poolManager, modelMapper} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()
const migrations = require('../migrations/migrations')

const model = modelMapper('transaction', migrations, {})

class TransactionModel extends Model{
    constructor(){
        super(pool, model, builder)
    }
}
module.exports = TransactionModel