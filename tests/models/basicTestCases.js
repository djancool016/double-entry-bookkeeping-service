module.exports = (input = {}) => {

    const {id} = input

    return {
        create: [
            {
                input: input,
                description: 'Success should returning return truthly'
            }, {
                input: {unknownKey: 'unknown'},
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
                output: {data: [{id: 1}]},
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
                output: {data: [{id: 1}]},
                description: 'Success should returning array of objects'
            }, {
                input: undefined,
                output: {code: 'ER_INVALID_BODY'},
                description: 'Invalid input should throwing error code ER_INVALID_BODY'
            }
        ],
        findByKeys: [
            {
                input: {id:1},
                output: {data: [{id: 1}]},
                description: 'Success should returning array of objects'
            }, {
                input: {unknownKey: 'unknown'},
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
                input: input,
                description: 'Success should return truthly'
            }, {
                input: {id, unknownKey: 'unknown'},
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
                input: id,
                description: 'Success should return truthly'
            }, {
                input: 999999,
                output: {code: 'ER_NOT_FOUND'},
                description: 'Empty result should throwing error code ER_NOT_FOUND'
            }, {
                input: undefined,
                output: {code: 'ER_INVALID_BODY'},
                description: 'Invalid input should throwing error code ER_INVALID_BODY'
            }
        ]
    }
}