const router = require('express').Router()

// add route module
router.use('/account', require('./account.route'))
router.use('/coa', require('./coa.route'))
router.use('/entry', require('./entry.route'))
router.use('/register', require('./register.route'))
router.use('/transaction', require('./transaction.route'))

module.exports = (app) => {
    app.use('/api', router)
}