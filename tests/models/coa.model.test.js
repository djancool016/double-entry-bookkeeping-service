const config = require('../../config')
const {poolManager, UnitTestFramework} = require('dwij-simple-orm').init(config)
const pool = poolManager.connect()
const Model = require('../../models/coa.model')

const testCases = {
    create: [
        {
            input: {account_id: 1, base_value: 1000, code: 9090, description: 'New Account'},
            description: 'Test autoIncrement, Success should returning truthly'
        },
        {
            input: {id: 78987, account_id: 1, base_value: 1000, code: 9080, description: 'New Account'},
            description: 'Success should returning truthly'
        }, {
            input: {account_idX: 1, base_value: 1000, code: 1010, description: 'New Account'},
            output: {code: 'ER_BAD_FIELD_ERROR'},
            description: 'Invalid input should throwing error code ER_BAD_FIELD_ERROR'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    findByPk: [
        {
            input: 1,
            output: {data: [{id: 1, account_id: 1, base_value: 291350, code: 1010, description: 'Kas UPK'}]},
            description: 'Success should returning array of objects'
        }, {
            input: 99999,
            output: {code: 'ER_NOT_FOUND'},
            description: 'Empty result should throwing error code ER_NOT_FOUND'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    findAll: [
        {
            input: {},
            output: {data: [{id: 1, account_id: 1, base_value: 291350, code: 1010, description: 'Kas UPK'}]},
            description: 'Success should returning array of objects'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    findByKeys: [
        {
            input: {id:1, account_id: 1, base_value: 291350, code: 1010, description: 'Kas UPK'},
            output: {data: [{id: 1, account_id: 1, base_value: 291350, code: 1010, description: 'Kas UPK'}]},
            description: 'Success should returning array of objects'
        }, {
            input: {id:999, account_id: 1, base_value: 291350, code: 1010, description: 'Kas UPK'},
            output: {code: 'ER_NOT_FOUND'},
            description: 'Empty result should throwing error code ER_NOT_FOUND'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    update: [
        {
            input: {id: 78987, account_id: 1, base_value: 1000, code: 9020, description: 'New Description'},
            description: 'Success should affectedRows  = 1'
        }, {
            input: {id: 78987, account_idX: 1, base_value: 1000, code: 1010, description: 'New Description'},
            output: {code: 'ER_BAD_FIELD_ERROR'},
            description: 'Invalid input should throwing error code ER_BAD_FIELD_ERROR'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    delete: [
        {
            input: 78987,
            description: 'Success should affectedRows = 1'
        }, {
            input: 78912,
            output: {code: 'ER_NOT_FOUND'},
            description: 'Empty result should throwing error code ER_NOT_FOUND'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ]
}
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