const express = require('express')
const UserController = require('../controllers/users')
const mw = require('../middleware')
const setSwagger = require('../swagger/config')

const router = express.Router()

router.get(
  '/',
  setSwagger.getUsers,
  mw.catchAsync(UserController.getUsersHandler)
)

module.exports = router
