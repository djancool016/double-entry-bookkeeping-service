const config = require('../config')
const {Model, builder, poolManager, modelMapper} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()
const migrations = require('../migrations/migrations')

const includesObj = {
    register: [],
    entry: ['id:entry_id', 'coa_code:coa_code', 'dc:dc'],
    coa: ['description:coa'],
    account: ['id:account_id','description:account', 'type:account_type']
}

const model = modelMapper('transaction', migrations, includesObj)

class TransactionModel extends Model{
    constructor(){
        super(pool, model, builder)
    }
}
module.exports = TransactionModel