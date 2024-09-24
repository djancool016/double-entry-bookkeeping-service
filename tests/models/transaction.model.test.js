const config = require('../../config')
const {poolManager, UnitTestFramework} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()
const Model = require('../../models/transaction.model')
const basicTestCases = require('./basicTestCases')
const coaSeed = require('../../seeders/202407291252-coa-seed').seed
const coa_code = coaSeed.map(seed => seed.code)

const testCases = basicTestCases({id: 9876, register_id: 1, date: "2022-04-20", amount: 0, description: "Test Insert New Transaction"})

testCases['sum'] = [
    {
        input: {sum:['amount']},
        output: {data:[{total_transaction_amount: 'random string'}]},
        description: 'Create SUM Query'
    },
    {
        input: {sum:['amount'], group_by: ['coa_code','coa', 'dc', 'account','account_id'], date_start: "2023-01-01", date_end: "2023-01-31"},
        output: {data:[{
            coa_code: "random number", 
            coa:'random string', 
            account_id: 'random number',
            account:'random string',
            dc:'random number', 
            total_transaction_amount: 'random string'
        }]},
        description: 'Create SUM Query'
    },
    {
        input: {sum:['amount'], coa_code:[3010, 4010], group_by: ['coa_code','coa', 'dc', 'account','account_id'], date_start: "2023-01-01", date_end: "2023-01-31"},
        output: {data:[{
            coa_code: "random number", 
            coa:'random string', 
            account_id: 'random number',
            account:'random string',
            dc:'random number', 
            total_transaction_amount: 'random string'
        }]},
        description: 'Create SUM Query using spesific coa code'
    }
]

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