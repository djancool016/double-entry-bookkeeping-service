const config = require('../config')
const {Model, builder, poolManager, modelMapper} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()

const migrations = {
    register: require('../migrations/202407201451-create-register'),
    coa: require('../migrations/202407201450-create-coa'),
    entry: require('../migrations/202407201455-create-entry')
}

const model = modelMapper('entry', migrations, {})

console.log(JSON.stringify(model, null, 4))

class EntryModel extends Model{
    constructor(){
        super(pool, model, builder)
    }
}
module.exports = EntryModel