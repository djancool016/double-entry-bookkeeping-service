const config = require('../config')
const {Model, builder, poolManager, modelMapper} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()
const migrations = require('../migrations/migrations')

const model = modelMapper('coa', migrations, {})

class CoaModel extends Model{
    constructor(){
        super(pool, model, builder)
    }
}
module.exports = CoaModel