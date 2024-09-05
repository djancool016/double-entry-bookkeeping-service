const config = require('../config')
const {Model, builder, poolManager, modelMapper} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()

const migrations = {
    account: require('../migrations/202407201449-create-account')
}

const model = modelMapper('account', migrations, {})

class AccountModel extends Model{
    constructor(){
        super(pool, model, builder)
    }
}
module.exports = AccountModel