const config = require('../config')
const {poolManager, runMigrations} = require('dwij-simple-orm').init(config)

const migrationsObject = {
    account: require('./202407201449-create-account'),
    coa: require('./202407201450-create-coa'),
    register: require('./202407201451-create-register'),
    entry: require('./202407201455-create-entry'),
    transaction: require('./202407221351-create-transaction'),
}

const migrations = Object.values(migrationsObject)
const pool = poolManager.connect()

module.exports = runMigrations(migrations, pool)