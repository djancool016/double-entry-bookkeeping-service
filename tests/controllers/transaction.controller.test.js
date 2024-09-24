const config = require('../../config')
const {poolManager, UnitTestFramework} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()
const controller = require('../../controllers/transaction.controller')
const basicTestCases = require('./basicTestCases')

const testCases = basicTestCases({body: {id: 9876, register_id: 1, date: "2022-04-20", amount: 0, description: "Test Insert New Transaction"}})

testCases['getReport'] = [
    {
        input: {body: {date_end: "2023-01-31"}},
        output: {result: {httpCode: 200}},
        description: 'Should returning report group by Coa'
    }
]

const testModule = () => {
    const res = {}
    const next = (req) => () => req
    const test = (method, req) => controller[method](req, res, next(req))

    return {
        create: (req) => test('create', req),
        read: (req) => test('read', req),
        update: (req) => test('update', req),
        delete: (req) => test('destroy', req),
        getReport: (req) => test('getReport', req)
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