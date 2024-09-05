const config = require('../config')
const {Model, builder, poolManager, modelMapper} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()

const migrations = {
    trasaction: require('../migrations/202407221351-create-transaction')
}

const model = modelMapper('trasaction', migrations, {})

class TransactionModel extends Model{
    constructor(){
        super(pool, model, builder)
    }
}
module.exports = TransactionModel