module.exports = (input = {}) => {

    const {id} = input.body

    return {
        create: [
            {
                input: input,
                output: {result: {httpCode: 201}},
                description: 'Success should returning httpCode 201'
            },{
                input: {body: {unknownKey: 'unknown'}},
                output: {result: {httpCode: 400, code: 'ER_BAD_FIELD_ERROR'}},
                description: 'Invalid keys should returning httpCode 400'
            },{
                input: {},
                output: {result: {httpCode: 400, code: 'ER_INVALID_BODY'}},
                description: 'Invalid body should returning httpCode 400'
            }
        ],
        read: [
            {
                input: {params:{id: 1}},
                output: {result: {httpCode: 200, data: [{id: 1}]}},
                description: 'input params.id should run model.findByPk and returning array'
            },{
                input: {query:{id: [1, id]}},
                output: {result: {httpCode: 200, data: [{id: 1},{id}]}},
                description: 'input query.id should run model.findByKeys and returning array'
            },{
                input: {body: {id: 1}},
                output: {result: {httpCode: 400, code: 'ER_GET_REFUSE_BODY'}},
                description: 'using GET from body is not allowed, should return error code ER_GET_REFUSE_BODY'
            },{
                input: {},
                output: {result: {httpCode: 200, data: [{id: 1}]}},
                description: 'input empty request object should run findAll'
            },{
                input: {query: {id: 99999}},
                output: {result: {httpCode: 404, code: 'ER_NOT_FOUND'}},
                description: 'Not found should returning httpCode 404'
            }
        ],
        update: [
            {
                input: input,
                output: {result: {httpCode: 200}},
                description: 'Success should returning httpCode 200'
            },{
                input: {body: {id, unknownKey: 'unknown'}},
                output: {result: {httpCode: 400, code: 'ER_BAD_FIELD_ERROR'}},
                description: 'Invalid keys should returning httpCode 400'
            },{
                input: {},
                output: {result: {httpCode: 400, code: 'ER_INVALID_BODY'}},
                description: 'Invalid body should returning httpCode 400'
            }
        ],
        delete: [
            {
                input: {params: {id}},
                output: {result: {httpCode: 200}},
                description: 'Success should returning httpCode 200'
            },{
                input: {params: {id: 9999}},
                output: {result: {httpCode: 404, code: 'ER_NOT_FOUND'}},
                description: 'Not found should returning httpCode 404'
            },{
                input: {},
                output: {result: {httpCode: 400, code: 'ER_INVALID_BODY'}},
                description: 'Invalid body should returning httpCode 400'
            }
        ]
    }
}