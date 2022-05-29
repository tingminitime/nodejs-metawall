const express = require('express')

// controllers
const UserController = require('../controllers/users')

// middleware
const mw = require('../middleware')
const setSwagger = require('../swagger/config')
const jwtAuth = require('../middleware/auth/jwtAuth')
const registerValidate = require('../middleware/users/register')
const loginValidate = require('../middleware/users/login')
const updatePasswordValidate = require('../middleware/users/updatePassword')

const router = express.Router()

/**
 * Get all users data
 */
router.get(
  '/',
  setSwagger.getUsers, // set swagger config
  mw.catchAsync(jwtAuth),
  mw.catchAsync(UserController.getUsersHandler)
)

/**
 * Check duplicate email
 */
router.post(
  '/check-email',
  setSwagger.checkEmail, // set swagger config
  mw.catchAsync(registerValidate.checkDuplicateEmail),
  mw.catchAsync(UserController.checkEmailSuccessfully)
)

/**
 * Create a user
 */
router.post(
  '/register',
  setSwagger.createUser, // set swagger config
  mw.catchAsync(registerValidate.checkDuplicateEmail),
  mw.catchAsync(registerValidate.validateFormat),
  // mw.catchAsync(encrypt),
  mw.catchAsync(UserController.createUserHandler)
)

/**
 * User login
 */
router.post(
  '/login',
  setSwagger.userLogin, // set swagger config
  mw.catchAsync(loginValidate.validateFormat),
  mw.catchAsync(UserController.userLoginHandler)
)

/**
 * Update user password
 */
router.post(
  '/update-password',
  setSwagger.updateUserPassword, // set swagger config
  mw.catchAsync(jwtAuth),
  mw.catchAsync(updatePasswordValidate.validateFormat),
  mw.catchAsync(UserController.updateUserPassword)
)

module.exports = router
