const config = require('../../config')
const {poolManager, UnitTestFramework} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()
const controller = require('../../controllers/account.controller')
const basicTestCases = require('./basicTestCases')

const testCases = basicTestCases({body: {id: 9876, description: 'New Account'}})

const testModule = () => {
    const res = {}
    const next = (req) => () => req
    const test = (method, req) => controller[method](req, res, next(req))

    return {
        create: (req) => test('create', req),
        read: (req) => test('read', req),
        update: (req) => test('update', req),
        delete: (req) => test('destroy', req)
    }
}

const test = new UnitTestFramework(testCases, testModule())

test.setBeforeAll = async () => {
    await require('../../migrations')
    await require('../../utils/truncator')
    await require('../../seeders')
}

test.setAfterAll = async () => {
    await pool.end()
}
test.runTest()