const config = require('../../config')
const {poolManager, UnitTestFramework} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()
const Model = require('../../models/transaction.model')
const basicTestCases = require('./basicTestCases')

const testCases = basicTestCases({id: 9876, register_id: 1, date: "2022-04-20", amount: 0, description: "Test Insert New Transaction"})

const testModule = new Model()

const test = new UnitTestFramework(testCases, testModule)

test.setBeforeAll = async () => {
    await require('../../migrations')
    await require('../../utils/truncator')
    await require('../../seeders')
}

test.setAfterAll = async () => {
    await pool.end()
}
test.runTest()