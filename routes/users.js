const express = require('express')
const UserController = require('../controllers/users')
const mw = require('../middleware')

const router = express.Router()

router.get('/', mw.catchAsync(UserController.getUsersHandler))

module.exports = router
