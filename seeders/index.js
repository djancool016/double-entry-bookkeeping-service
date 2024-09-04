const config = require('../config')
const {poolManager, runSeeds} = require('dwij-simple-orm').init(config)

const seedsObject = {
    account: require('./202407291250-account-seed'),
    coa: require('./202407291252-coa-seed'),
    register: require('./202407291253-register-seed'),
    entry: require('./202407291254-entry-seed'),
    transaction: require('./202707291336-transaction-seed'),
}

const seeds = Object.values(seedsObject)
const pool = poolManager.connect()

module.exports = runSeeds(seeds, pool)