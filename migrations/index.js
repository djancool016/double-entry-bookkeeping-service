const config = require('../config')
const {poolManager, runMigrations} = require('dwij-simple-orm').init(config)
const migrationsObject = require('./migrations')

const migrations = Object.values(migrationsObject)
const pool = poolManager.connect()

module.exports = runMigrations(migrations, pool)