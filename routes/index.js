const router = require('express').Router()

// add route module

module.exports = (app) => {
    app.use('/api', router)
}