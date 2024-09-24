const config = require('../../config')
const {poolManager, UnitTestFramework} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()
const Model = require('../../models/coa.model')
const basicTestCases = require('./basicTestCases')

const testCases = basicTestCases({id: 9876, account_id: 1, code: 9080, description: 'New Account'})

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