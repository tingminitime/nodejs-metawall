const express = require('express')
const router = express.Router()

// Controllers
const UserInfoController = require('../controllers/userInfo')
const UserPostController = require('../controllers/userPost')

// Middleware - common
const mw = require('../middleware')
const setSwagger = require('../middleware/swagger/config')
const jwtAuth = require('../middleware/auth/jwtAuth')

// Middleware - validations
const updateUserProfileInspect = require('../middleware/userInfo/updateUserProfile')
const registerInspect = require('../middleware/userInfo/register')
const loginInspect = require('../middleware/userInfo/login')
const updatePasswordInspect = require('../middleware/userInfo/updatePassword')
const updateUserPostInspect = require('../middleware/userPost/updatePost')

/**
 * Get user profile
 */
router.get(
  '/profile',
  setSwagger.getUserProfile,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(UserInfoController.getUserProfileHandler)
)

/**
 * Update user profile
 */
router.patch(
  '/profile',
  setSwagger.updateUserProfile,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(updateUserProfileInspect.validateFormat),
  mw.catchAsync(UserInfoController.updateUserProfileHandler)
)

/**
 * Check duplicate email
 */
router.post(
  '/check-email',
  setSwagger.checkEmail, // set swagger config
  mw.catchAsync(registerInspect.checkDuplicateEmail),
  mw.catchAsync(UserInfoController.checkEmailSuccessfully)
)

/**
 * Create a user
 */
router.post(
  '/register',
  setSwagger.createUser, // set swagger config
  mw.catchAsync(registerInspect.checkDuplicateEmail),
  mw.catchAsync(registerInspect.validateFormat),
  mw.catchAsync(UserInfoController.createUserHandler)
)

/**
 * User login
 */
router.post(
  '/login',
  setSwagger.userLogin, // set swagger config
  mw.catchAsync(loginInspect.validateFormat),
  mw.catchAsync(UserInfoController.userLoginHandler)
)

/**
 * Update user password
 */
router.post(
  '/update-password',
  setSwagger.updateUserPassword, // set swagger config
  mw.catchAsync(jwtAuth),
  mw.catchAsync(updatePasswordInspect.validateFormat),
  mw.catchAsync(UserInfoController.updateUserPasswordHandler)
)

/**
 * Update single post
 */
router.patch(
  '/post/:postId',
  setSwagger.updateUserPost,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(updateUserPostInspect.validateOwnUser),
  mw.catchAsync(UserPostController.updateUserPostHandler)
)

module.exports = router
