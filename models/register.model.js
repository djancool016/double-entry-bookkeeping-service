const config = require('../config')
const {Model, builder, poolManager, modelMapper} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()

const migrations = {
    register: require('../migrations/202407201451-create-register')
}

const model = modelMapper('register', migrations, {})

class RegisterModel extends Model{
    constructor(){
        super(pool, model, builder)
    }
}
module.exports = RegisterModel